import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { Configuration } from '$lib/api';

export const RuntimeApiConfiguration = new Configuration({
  basePath: PUBLIC_BACKEND_URL,
  credentials: 'include',
});
