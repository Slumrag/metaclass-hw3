import { githubApiCore } from './core/githubApiCore';

export async function getRepoReadMe(owner: string, repo: string): Promise<unknown> {
  return await githubApiCore.get(`/repos/${owner}/${repo}/readme`);
}
