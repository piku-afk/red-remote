import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';

import manifest from './manifest.config.js';

export default defineConfig({
  plugins: [crx({ manifest })],
  envPrefix: 'RR_', // Prefix for environment variables
  build: {},
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
});
