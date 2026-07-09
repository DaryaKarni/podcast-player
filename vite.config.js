import {defineConfig, loadEnv} from 'vite';
import crypto from 'crypto'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.podcastindex.org',
        changeOrigin: true,
      }
    }
  }
});