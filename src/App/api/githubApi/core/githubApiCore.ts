import axios from 'axios';
import { GITHUB_API_BASE } from 'configs/api/baseURLs';

export const githubApiCore = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: { Authorization: `Bearer ${process.env.VITE_GITHUB_API_TOKEN}` },
});
