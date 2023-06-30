import type { ApiConfig } from '$lib/api';
import { configurationApi } from '$lib/fetchSingleton';
import { writable, type Readable } from 'svelte/store';

const store = writable<ApiConfig | null>(null);

// Will run both on server and client
configurationApi
  .getApiConfig()
  .then((config) => store.set(config))
  .catch((e) => console.error('[apiConfigStore.ts] Error loading config', e));

export const ApiConfigStore: Readable<ApiConfig | null> = store;
