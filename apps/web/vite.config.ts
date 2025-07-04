import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  envPrefix: 'RR_',
  server: {
    port: 3000,
  },
});
