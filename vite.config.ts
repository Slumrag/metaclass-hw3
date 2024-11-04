import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { GITHUB_API_BASE, GITHUB_DOWNLOAD_BASE } from './src/configs/api';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      // '/foo': 'http://localhost:4567',
      [GITHUB_API_BASE]: {
        target: 'https://api.github.com/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(GITHUB_API_BASE, ''),
      },
      [GITHUB_DOWNLOAD_BASE]: {
        target: 'https://raw.githubusercontent.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(GITHUB_DOWNLOAD_BASE, ''),
      },
    },
  },
});
