import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  clearScreen: false,

  resolve: {
    alias: {
      $api: resolve('./src/api'),
      $cmp: resolve('./src/components'),
      $models: resolve('./src/models'),
      $routes: resolve('./src/routes'),
    },
  },

  plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: !isProduction,
    emptyOutDir: true,
  },

  server: { port: 1337 },
});
