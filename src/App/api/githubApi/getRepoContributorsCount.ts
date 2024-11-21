import { AxiosResponse } from 'axios';
import { getRepoContributors } from './getRepoContributors';

export async function getRepoContributorsCount(owner: string, repo: string): Promise<AxiosResponse<number | null>> {
  const response = await getRepoContributors(owner, repo, { anon: true, per_page: 1 });
  const link = response.headers?.link;

  //  метчит query parameter page для ссылки с параметром rel="last". В группе 1 будет содержаться номер последней страницы.
  const lastPage = /.*<(?:.*page=(\d+))>; rel="last"/;

  const count = link !== undefined ? link.match(lastPage)[1] : null;
  return { ...response, data: count };
}
