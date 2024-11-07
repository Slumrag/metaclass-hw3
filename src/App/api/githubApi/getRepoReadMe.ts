import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { ContentFileApi } from './types';

export async function getRepoReadMe(owner: string, repo: string): Promise<AxiosResponse<ContentFileApi>> {
  return await githubApiCore.get(`/repos/${owner}/${repo}/readme`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
}
