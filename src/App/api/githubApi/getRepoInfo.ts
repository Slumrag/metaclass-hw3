import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { FullRepositoryApi } from './types/schema';

export async function getRepoInfo(owner: string, repo: string): Promise<AxiosResponse<FullRepositoryApi>> {
  const response = await githubApiCore.get(`/repos/${owner}/${repo}`);
  return response;
}
