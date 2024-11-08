import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { RequestPaginationOptions, MinimalRepository } from './types';

export async function getOrgRepos(
  org: string,
  options?: RequestPaginationOptions,
): Promise<AxiosResponse<MinimalRepository[]>> {
  return await githubApiCore.get(`/orgs/${org}/repos`, { params: options });
}
