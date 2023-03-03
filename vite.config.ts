import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  clearScreen: false,
  resolve: {
    alias: {
      $api: resolve('./src/api'),
      $cmp: resolve('./src/components'),
      $models: resolve('./src/models'),
      $routes: resolve('./src/routes'),
    },
  },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
  server: {
    port: 1337
  },
});
