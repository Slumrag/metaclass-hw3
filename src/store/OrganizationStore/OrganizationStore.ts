import { makeAutoObservable, runInAction } from 'mobx';
import { getOrgRepos } from 'App/api';
import { RequestPaginationOptions } from 'App/api/githubApi/types';
import { MinimalRepositoryModel, normalizeMinimalRepository, SimpleUserModel } from 'store/models';
import { META } from 'utils/const';

type PrivateFields = '_repos' | '_meta' | '_organization';

class OrganizationStore {
  private _repos: MinimalRepositoryModel[] = [];
  private _meta: META = META.INITIAL;
  private _organization: SimpleUserModel | null = null;

  constructor() {
    makeAutoObservable<OrganizationStore, PrivateFields>(this);
  }

  get repos() {
    return this._repos;
  }
  get meta() {
    return this._meta;
  }
  get organization() {
    return this._organization;
  }

  public async getRepos(org: string, options?: RequestPaginationOptions) {
    this._meta = META.LOADING;
    try {
      const response = await getOrgRepos(org, options);
      runInAction(() => {
        this._meta = META.SUCCESS;
        this._repos = response.data.map(normalizeMinimalRepository);
        this._organization = this.repos[0]?.owner;
      });
    } catch (error) {
      this._meta = META.ERROR;
      console.error(error);
    }
  }
}

export default OrganizationStore;
