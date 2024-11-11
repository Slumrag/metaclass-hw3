import { AxiosResponse } from 'axios';
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
      const responses = await Promise.allSettled([
        getRepoInfo(org, repo),
        getRepoLanguages(org, repo),
        getRepoContributors(org, repo),
        getRepoContributorsCount(org, repo),
      ]);

      if (responses.every((res) => res.status === 'fulfilled')) {
        const [repo, languages, contributors, contributorsCount] = responses as PromiseFulfilledResult<AxiosResponse>[];
        runInAction(() => {
          this._repo = normalizeFullRepository(repo.value.data, {
            languages: languages.value.data,
            contributors: contributors.value.data,
            contributorsCount: contributorsCount.value.data as number,
          });
        });
      } else {
        throw responses.filter((el) => el.status === 'rejected');
      }

      const { data: readme } = await getRepoReadMe(org, repo);
      runInAction(() => {
        this._readme = readme.download_url;
        this._meta = META.SUCCESS;
      });
    } catch (error) {
      runInAction(() => {
        this._meta = META.ERROR;
      });
      if (Array.isArray(error)) {
        (error as PromiseRejectedResult[]).map((e) => console.error(e.reason));
      } else {
        console.error(error);
      }
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
