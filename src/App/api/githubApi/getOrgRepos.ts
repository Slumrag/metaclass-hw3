import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { RequestPaginationOptions, MinimalRepositoryApi } from './types';

export async function getOrgRepos(
  org: string,
  options?: RequestPaginationOptions,
): Promise<AxiosResponse<MinimalRepositoryApi[]>> {
  return await githubApiCore.get(`/orgs/${org}/repos`, { params: options });
}
