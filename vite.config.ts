import { defineConfig, type PluginOption } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import routify from '@roxi/routify/vite-plugin';
import { resolve } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  clearScreen: false,

  resolve: {
    alias: {
      $cmp: resolve('./src/components'),
      $api: resolve('./src/api/generated'),
    },
  },

  plugins: [routify(), svelte()],

  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: !isProduction,
    emptyOutDir: true,
  },

  server: { port: 1337 },
});
