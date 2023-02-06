import { defineConfig, type PluginOption } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import routify from '@roxi/routify/vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  clearScreen: false,

  plugins: [routify(), svelte(), visualizer() as PluginOption],

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },

  server: { port: 1337 },
});
