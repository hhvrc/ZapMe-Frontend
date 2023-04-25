import preprocess from 'svelte-preprocess';
import { default as cfAdapter } from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true,
    }),
  ],
  kit: {
    adapter: cfAdapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>'],
      },
    }),
    alias: {
      $lib: 'src/lib',
      '$lib/*': 'src/lib/*',
      $types: 'src/types',
      '$types/*': 'src/types/*',
      $components: 'src/components',
      '$components/*': 'src/components/*',
    },
  },
};
