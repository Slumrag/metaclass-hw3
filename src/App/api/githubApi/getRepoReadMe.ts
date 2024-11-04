import { AxiosResponse } from 'axios';
import { githubApiCore } from './core/githubApiCore';
import { ContentFile } from './types';

export async function getRepoReadMe(owner: string, repo: string): Promise<AxiosResponse<ContentFile>> {
  return await githubApiCore.get(`/repos/${owner}/${repo}/readme`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
}
