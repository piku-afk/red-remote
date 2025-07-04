import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react-swc';

import manifest from './manifest.config.js';

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  envPrefix: 'RR_', // Prefix for environment variables
  build: {},
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
});
