import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { RequestPaginationOptions, MinimalRepositoryApi, RequestRepositoryTypeOptions } from './types';

export type OrgReposOptions = RequestPaginationOptions & RequestRepositoryTypeOptions;

export async function getOrgRepos(
  org: string,
  options?: OrgReposOptions,
): Promise<AxiosResponse<MinimalRepositoryApi[]>> {
  return await githubApiCore.get(`/orgs/${org}/repos`, { params: options });
}
