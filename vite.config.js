import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Custom domain serves from the root domain (https://auvira.health/)
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
