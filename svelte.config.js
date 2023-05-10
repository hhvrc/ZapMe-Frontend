import { default as cfAdapter } from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

export default {
  preprocess: [
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
