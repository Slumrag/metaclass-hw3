import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { RepositoryLanguages } from './types/RepositoryLanguages';

export async function getRepoLanguages(owner: string, repo: string): Promise<AxiosResponse<RepositoryLanguages>> {
  const response = await githubApiCore.get(`/repos/${owner}/${repo}/languages`);
  return response;
}
