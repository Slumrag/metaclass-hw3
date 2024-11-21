import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { RepositoryLanguagesApi } from './types/schema';

export async function getRepoLanguages(owner: string, repo: string): Promise<AxiosResponse<RepositoryLanguagesApi>> {
  const response = await githubApiCore.get(`/repos/${owner}/${repo}/languages`);
  return response;
}
