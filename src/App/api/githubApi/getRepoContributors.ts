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

export async function getRepoContributorsCount(owner: string, repo: string): Promise<AxiosResponse<number>> {
  const response = await getRepoContributors(owner, repo, { anon: true, per_page: 1 });
  const count = response.headers.link.match(/.*<(?:.*page=(\d+))>; rel="last"/)[1];
  // console.log(count);
  // response.data=response.data.length
  return { ...response, data: count };
}
