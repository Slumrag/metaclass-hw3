import axios, { AxiosResponse } from 'axios';
import { GITHUB_API_BASE } from 'configs/api/githubApiBase';
import { MinimalRepository } from './types';

export const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: { Authorization: import.meta.env.VITE_GITHUB_API_TOKEN },
});

export async function getOrgRepos(org: string): Promise<AxiosResponse<MinimalRepository[]>> {
  return await githubApi.get(`/orgs/${org}/repos`);
}

export async function getRepoInfo(owner: string, repo: string): Promise<unknown> {
  return (await githubApi.get(`/repos/${owner}/${repo}`)).data;
}

export async function getRepoReadMe(owner: string, repo: string): Promise<unknown> {
  return (await githubApi.get(`/repos/${owner}/${repo}/readme`)).data;
}
