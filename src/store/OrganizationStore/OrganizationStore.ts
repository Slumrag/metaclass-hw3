import { makeAutoObservable, runInAction } from 'mobx';
import { getOrgRepos, OrgReposOptions } from 'App/api';
import { TYPE_OPTIONS } from 'App/api/githubApi/types';
import RootStore from 'store/RootStore/RootStore';
import { MinimalRepositoryModel, normalizeMinimalRepository, SimpleUserModel } from 'store/models';
import { META } from 'utils/const';
import { parseGitHubLinkHeader, clamp } from 'utils/helpers';
import { IPaginationStore } from 'utils/types';

type PrivateFields = '_repos' | '_meta' | '_organization' | '_currentPage' | '_pages' | '_perPage' | '_type';

class OrganizationStore implements IPaginationStore<MinimalRepositoryModel> {
  private _data: MinimalRepositoryModel[] = [];
  private _meta: META = META.INITIAL;
  private _organization: SimpleUserModel | null = null;
  private _currentPage: number = 1;
  private _pages: number = 1;
  private _perPage: number = 3;
  private _type: `${TYPE_OPTIONS}` = TYPE_OPTIONS.all;
  readonly root: RootStore;

  constructor(root: RootStore) {
    makeAutoObservable<OrganizationStore, PrivateFields>(this, {
      _meta: true,
      _currentPage: true,
      _organization: true,
      _pages: true,
      _perPage: true,
      _repos: true,
      _type: true,
    });
    this.root = root;
  }

  get data() {
    return this._data;
  }
  get meta() {
    return this._meta;
  }
  get organization() {
    return this._organization;
  }
  get currentPage() {
    return this._currentPage;
  }

  get pages() {
    return this._pages;
  }
  get perPage() {
    return this._perPage;
  }
  get login() {
    return this.organization?.login;
  }
  get type() {
    return this._type;
  }

  set type(type: `${TYPE_OPTIONS}` | undefined) {
    if (type !== undefined) {
      this._type = type;
    }
  }

  set currentPage(page: number) {
    this._currentPage = clamp(1, page, this.pages);
  }

  public async goToPage(page: number) {
    if (this.login) {
      await this.getRepos(this.login, { page });
    }
    this.currentPage = page;
  }

  public async getRepos(org: string, options?: OrgReposOptions) {
    if (!org) {
      return;
    }
    runInAction(() => {
      this._meta = META.LOADING;
    });

    try {
      const defaultOptions: OrgReposOptions = { type: this.type, per_page: this.perPage, page: this.currentPage };

      const newOptions: OrgReposOptions = options !== undefined ? { ...defaultOptions, ...options } : defaultOptions;

      const response = await getOrgRepos(org, newOptions);

      runInAction(() => {
        this._meta = META.SUCCESS;

        console.log('current pages ', newOptions?.page);
        const linkParams = response.headers?.link ? parseGitHubLinkHeader(response.headers?.link) : null;

        if (linkParams) {
          if (linkParams?.last) {
            const page = linkParams.last.searchParams.get('page');

            this._pages = Number(page);
          } else {
            this._pages = newOptions?.page ?? this._pages;
          }
        } else {
          this._pages = 1;
        }

        this.type = newOptions?.type;

        this._perPage = newOptions?.per_page ?? this._perPage;
        this._currentPage = newOptions?.page ?? this._currentPage;

        this._data = response.data.map(normalizeMinimalRepository);

        this._organization = this.data[0]?.owner;
      });
    } catch (error) {
      this._meta = META.ERROR;
      console.error(error);
    }
  }
}

export default OrganizationStore;
