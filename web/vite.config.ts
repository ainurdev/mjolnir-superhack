import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    exclude: ['@urql/svelte'],
  },
  resolve: {
    alias: {
      '@/icons': path.resolve('./src/pages/_components/icons'),
      '@/constants': path.resolve('./src/constants'),
      '@/stores': path.resolve('./src/stores'),
      '@/types': path.resolve('./src/types'),
      '@/utils': path.resolve('./src/utils'),
      '@/queries': path.resolve('./src/queries'),
      '@/pages': path.resolve('./src/pages'),
    },
  },
});
