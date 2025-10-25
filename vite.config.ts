/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio-site/',
  plugins: [react()],
  optimizeDeps: {},
  // @ts-expect-error - "test" is used by Vitest, ignored by Vite at build time
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
