import { githubApiCore } from './core/githubApiCore';

export async function getRepoInfo(owner: string, repo: string): Promise<unknown> {
  return await githubApiCore.get(`/repos/${owner}/${repo}`);
}
