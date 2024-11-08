import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { FullRepository } from './types/FullRepository';

export async function getRepoInfo(owner: string, repo: string): Promise<AxiosResponse<FullRepository>> {
  const response = await githubApiCore.get(`/repos/${owner}/${repo}`);
  return response;
}
