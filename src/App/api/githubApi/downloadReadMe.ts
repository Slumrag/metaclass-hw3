import { AxiosResponse } from 'axios';
import { GITHUB_DOWNLOAD_BASE } from 'configs/api';
import { githubApiCore } from './core/githubApiCore';

export async function downloadReadMe(src: string): Promise<AxiosResponse<string>> {
  const url = new URL(src);
  return await githubApiCore.get(url.pathname, { baseURL: GITHUB_DOWNLOAD_BASE });
}
