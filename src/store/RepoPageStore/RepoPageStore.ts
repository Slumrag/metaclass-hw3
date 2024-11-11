import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { getRepoContributors, getRepoContributorsCount, getRepoInfo, getRepoLanguages, getRepoReadMe } from 'App/api';
import { FullRepositoryModel, normalizeFullRepository } from 'store/';
import { ILocalStore, META } from 'utils/';

type PrivateFields = '_repos' | '_readme' | '_meta';

class RepoPageStore implements ILocalStore {
  private _repo: FullRepositoryModel | null = null;
  private _readme: string | null = null;
  private _meta: META = META.INITIAL;

  constructor() {
    makeAutoObservable<RepoPageStore, PrivateFields>(this);
  }

  async getRepo(org: string, repo: string) {
    runInAction(() => {
      this._meta = META.LOADING;
    });
    try {
      const { data } = await getRepoInfo(org, repo);

      const { data: languages } = await getRepoLanguages(org, repo);

      const { data: contributors } = await getRepoContributors(org, repo);

      const { data: contributorsCount } = await getRepoContributorsCount(org, repo);

      this._repo = normalizeFullRepository(data, {
        languages,
        contributors,
        contributorsCount: contributorsCount as number,
      });

      const { data: readme } = await getRepoReadMe(org, repo);

      this._readme = readme.download_url;
      this._meta = META.SUCCESS;
    } catch (error) {
      this._meta = META.ERROR;
      console.error(error as AxiosError);
    }
  }

  public get repo(): FullRepositoryModel | null {
    return this._repo;
  }

  public get readme(): string | null {
    return this._readme;
  }

  public get meta(): META {
    return this._meta;
  }

  destroy() {
    this._repo = null;
    this._readme = null;
    this._meta = META.INITIAL;
  }
}
export default RepoPageStore;
