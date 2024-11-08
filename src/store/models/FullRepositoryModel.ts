import { FullRepositoryApi, RepositoryLanguagesApi, SimpleUserApi } from 'App/api/githubApi/types';
import { normalizeRepositoryLanguages, RepositoryLanguagesModel } from './RepositoryLanguagesModel';
import { normalizeSimpleUser, SimpleUserModel } from './SimpleUserModel';

export type FullRepositoryModel = {
  id: FullRepositoryApi['id'];
  name: FullRepositoryApi['name'];
  homepage: FullRepositoryApi['homepage'];
  forks: FullRepositoryApi['forks_count'];
  stargazersCount: FullRepositoryApi['stargazers_count'];
  watchers: FullRepositoryApi['watchers_count'];
  topics: FullRepositoryApi['topics'];
  languages: RepositoryLanguagesModel | null;
  contributors: SimpleUserModel[] | null;
  contributorsCount: number | null;
};

export function normalizeFullRepository(
  from: FullRepositoryApi,
  contributors?: SimpleUserApi[],
  contributorsCount?: number,
  languages?: RepositoryLanguagesApi,
): FullRepositoryModel {
  const model = {
    id: from.id,
    name: from.name,
    homepage: from.homepage,
    forks: from.forks_count,
    stargazersCount: from.stargazers_count,
    watchers: from.watchers,
    topics: from.topics,
    languages: languages ? normalizeRepositoryLanguages(languages) : null,
    contributors: contributors ? contributors.map(normalizeSimpleUser) : null,
    contributorsCount: contributorsCount ?? null,
  };
  return model;
}
