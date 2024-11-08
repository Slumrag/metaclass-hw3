import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { RequestPaginationOptions } from './types';
import { SimpleUser } from './types/MinimalRepository';

export type RequestContributorsOptions = RequestPaginationOptions & {
  anon?: boolean;
};

export async function getRepoContributors(
  owner: string,
  repo: string,
  options?: RequestContributorsOptions,
): Promise<AxiosResponse<SimpleUser[]>> {
  const response = await githubApiCore.get(`/repos/${owner}/${repo}/contributors`, { params: options });
  return response;
}
