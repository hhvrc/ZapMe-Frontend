import { configurationApi } from '$lib/fetchSingleton';
import { ApiConfigStore } from '$lib/stores';
import { get } from 'svelte/store';

export async function load() {
  let config = get(ApiConfigStore);

  if (!config) {
    try {
      config = await configurationApi.getApiConfig();
      ApiConfigStore.set(config);
    } catch (e) {
      console.error('[+layout.server.ts] Error loading config', e);
      config = null;
    }
  }

  return {
    config,
  };
}
