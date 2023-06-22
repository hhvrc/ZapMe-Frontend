import { type ApiConfig } from '$lib/api';
import { configurationApi } from '$lib/fetchSingleton';

let config: ApiConfig | null = null;

export async function load() {
  if (!config) {
    config = await configurationApi.getConfig();
  }

  return {
    config,
  };
}
