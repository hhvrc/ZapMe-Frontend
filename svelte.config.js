import adapter from '@sveltejs/adapter-auto';
import { default as cfAdapter } from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

let activeAdapter;

// Read: https://developers.cloudflare.com/pages/platform/build-configuration#environment-variables
if (process.env.CF_PAGES) {
  // Read: https://kit.svelte.dev/docs/adapter-cloudflare
  activeAdapter = cfAdapter({
      routes: {
        include: ['/*'],
        exclude: []
      }
  });
} else {
  activeAdapter = adapter();
}

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: activeAdapter,
    alias: {
      '$types': 'src/types',
      '$types/*': 'src/types/*',
      '$components': 'src/components',
      '$components/*': 'src/components/*'
    }
  }
};