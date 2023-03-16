import { default as cfAdapter } from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: cfAdapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    }),
    alias: {
      '$types': 'src/types',
      '$types/*': 'src/types/*',
      '$components': 'src/components',
      '$components/*': 'src/components/*'
    }
  }
};