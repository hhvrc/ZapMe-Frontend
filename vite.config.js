import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.log('\u001b[1;31mWARNING: TLS CERTIFICATE VERIFICATION DISABLED FOR DEVELOPMENT, THIS SHOULD NOT APPEAR IN PRODUCTION\u001b[0m');
}

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
