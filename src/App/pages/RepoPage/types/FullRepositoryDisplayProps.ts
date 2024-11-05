import { FullRepository, SimpleUser } from 'App/api/githubApi/types';

export type LanguagesTuple = [string, number];

export type FullRepositoryDisplayProps = {
  name: FullRepository['name'];
  homepage: FullRepository['homepage'];
  forks: FullRepository['forks_count'];
  stars: FullRepository['stargazers_count'];
  watchers: FullRepository['watchers_count'];
  topics: FullRepository['topics'];
  languages: LanguagesTuple[];
  contributors: SimpleUser[];
  contributorsCount: number;
};
