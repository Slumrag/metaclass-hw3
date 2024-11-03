import axios from 'axios';
import { GITHUB_API_BASE } from 'configs/api/githubApiBase';

export const githubApiCore = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: { Authorization: import.meta.env.VITE_GITHUB_API_TOKEN },
});
