import { RepositoryLanguagesApi } from 'App/api/githubApi/types';

export type RepositoryLanguagesModel = [string, number][];

export function normalizeRepositoryLanguages(from: RepositoryLanguagesApi): RepositoryLanguagesModel | null {
  return Object.entries(from).sort((a, b) => b[1] - a[1]);
}
