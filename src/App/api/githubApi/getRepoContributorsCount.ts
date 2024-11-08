import { AxiosResponse } from 'axios';
import { getRepoContributors } from './getRepoContributors';

export async function getRepoContributorsCount(owner: string, repo: string): Promise<AxiosResponse<number | null>> {
  const response = await getRepoContributors(owner, repo, { anon: true, per_page: 1 });
  const link = response.headers?.link;

  const count = link !== undefined ? link.match(/.*<(?:.*page=(\d+))>; rel="last"/)[1] : null;
  return { ...response, data: count };
}
