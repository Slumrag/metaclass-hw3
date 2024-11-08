import { FullRepositoryApi, SimpleUserApi } from 'App/api/githubApi/types';

export type LanguagesTuple = [string, number];

export type FullRepositoryModel = {
  name: FullRepositoryApi['name'];
  homepage: FullRepositoryApi['homepage'];
  forks: FullRepositoryApi['forks_count'];
  stars: FullRepositoryApi['stargazers_count'];
  watchers: FullRepositoryApi['watchers_count'];
  topics: FullRepositoryApi['topics'];
  languages: LanguagesTuple[];
  contributors: SimpleUserApi[];
  contributorsCount: number | null;
};
