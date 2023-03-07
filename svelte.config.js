import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '$lib': './src/lib',
      '$lib/*': './src/lib/*',
      
      '$lib/api': 'src/api',
      '$lib/api/*': 'src/api/*',

      '$components/*': 'src/components/*',
      '$models/*': 'src/models/*',
      '$routes/*': 'src/routes/*'
    }
  }
};