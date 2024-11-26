import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { getOrgRepos, OrgReposOptions, RepoTypeOptions } from 'App/api';
import RootStore from 'store/RootStore/RootStore';
import { MinimalRepositoryModel, normalizeMinimalRepository, SimpleUserModel } from 'store/models';
import { parseGitHubLinkHeader, clamp, META, IPaginationStore } from 'utils/';

type PrivateFields = '_repos' | '_meta' | '_organization' | '_currentPage' | '_pages' | '_perPage' | '_type' | '_error';

class OrganizationStore implements IPaginationStore<MinimalRepositoryModel> {
  private _data: MinimalRepositoryModel[] = [];
  private _reposCount: number = 0;
  private _meta: META = META.INITIAL;
  private _organization: SimpleUserModel | null = null;
  private _currentPage: number = 1;
  private _pages: number = 1;
  private _perPage: number = 30;
  private _type: RepoTypeOptions = RepoTypeOptions.all;
  private _error: AxiosError | null = null;
  private _searchHistory: string[] = [];
  private _maxHistoryLength = 5;
  readonly root: RootStore;

  constructor(root: RootStore) {
    makeAutoObservable<OrganizationStore, PrivateFields>(this);
    this.root = root;
  }

  init() {
    const search = this.root.localStorage.get('search') as string[];
    if (!search) return;
    this._searchHistory = [...search];
  }

  get data() {
    return this._data;
  }

  get reposCount(): number {
    return this._reposCount;
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

  get searchHistory(): string[] {
    return this._searchHistory;
  }

  get error() {
    return this._error;
  }

  set type(type: RepoTypeOptions | undefined) {
    if (type) {
      this._type = type;
    }
  }

  set currentPage(page: number) {
    this._currentPage = clamp(1, page, this.pages);
  }

  addToHistory(entry: string) {
    if (this.searchHistory.includes(entry)) return;

    this._searchHistory.unshift(entry);
    if (this._searchHistory.length > this._maxHistoryLength) {
      this._searchHistory.pop();
    }

    this.root.localStorage.set('search', this._searchHistory);
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
    this.clear();
    this._error = null;
    this._meta = META.LOADING;

    try {
      const newOptions: OrgReposOptions = this._handleSearchOptions(options);
      const response = await getOrgRepos(org, newOptions);
      const responseTotal = await getOrgRepos(org, { ...newOptions, per_page: 1 });

      runInAction(() => {
        this._meta = META.SUCCESS;

        const linkParams = response.headers?.link ? parseGitHubLinkHeader(response.headers?.link) : null;
        const linkParamsTotal = responseTotal.headers?.link ? parseGitHubLinkHeader(responseTotal.headers?.link) : null;
        if (linkParamsTotal) {
          const reposCount = linkParamsTotal.last.searchParams.get('page');
          this._reposCount = reposCount ? Number(reposCount) : 0;
        }
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
      runInAction(() => {
        this._meta = META.ERROR;
        this._error = error as AxiosError;
      });
      console.error(error);
    }
  }
  private _handleSearchOptions(options: OrgReposOptions | undefined) {
    const defaultOptions: OrgReposOptions = { type: this.type, per_page: this.perPage, page: this.currentPage };

    const newOptions: OrgReposOptions = options !== undefined ? { ...defaultOptions, ...options } : defaultOptions;
    return newOptions;
  }

  clearData() {
    this._data = [];
    this._reposCount = 0;
  }
  clearSearch() {
    this._organization = null;
    this._type = RepoTypeOptions.all;
  }
  resetPagination() {
    this._pages = 1;
    this._currentPage = 1;
  }
  clearError() {
    this._error = null;
  }
  clearSearchHistory() {
    this._searchHistory = [];
    this.root.localStorage.delete('search');
  }
  clear() {
    this._meta = META.INITIAL;
    this.clearData();
    this.resetPagination();
    this.clearError();
  }
}

export default OrganizationStore;
