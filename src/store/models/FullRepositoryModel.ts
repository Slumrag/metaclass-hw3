import { FullRepositoryApi, RepositoryLanguagesApi, SimpleUserApi } from 'App/api/githubApi/types';
import { normalizeRepositoryLanguages, RepositoryLanguagesModel } from './RepositoryLanguagesModel';
import { initializeSimpleUser, normalizeSimpleUser, SimpleUserModel } from './SimpleUserModel';

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
  owner: SimpleUserModel;
};

export function initializeFullRepository(): FullRepositoryModel {
  return {
    id: 0,
    name: '',
    homepage: null,
    forks: 0,
    stargazersCount: 0,
    watchers: 0,
    topics: undefined,
    languages: [],
    contributors: [],
    contributorsCount: null,
    owner: initializeSimpleUser(),
  };
}

type AdditionalData = {
  contributors?: SimpleUserApi[];
  contributorsCount?: number;
  languages?: RepositoryLanguagesApi;
};

export function normalizeFullRepository(from: FullRepositoryApi, additional?: AdditionalData): FullRepositoryModel {
  const { contributors, contributorsCount, languages } = additional!;

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
    owner: normalizeSimpleUser(from.owner),
  };
  return model;
}
