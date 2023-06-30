import { type ApiConfig } from '$lib/api';
import { configurationApi } from '$lib/fetchSingleton';

let config: ApiConfig | null = null;

export async function load() {
  if (!config) {
    try {
      config = await configurationApi.getApiConfig();
    } catch (e) {
      console.error('[+layout.server.ts] Error loading config', e);
      config = null;
    }
  }

  return {
    config,
  };
}
