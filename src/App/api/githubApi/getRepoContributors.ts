import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { SimpleUser } from './types/MinimalRepository';

export async function getRepoContributors(owner: string, repo: string): Promise<AxiosResponse<SimpleUser[]>> {
  const response = await githubApiCore.get(`/repos/${owner}/${repo}/contributors`);
  return response;
}
