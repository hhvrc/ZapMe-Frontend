import { type Config } from '$lib/api';
import { configurationApi } from '$lib/fetchSingleton';

let config: Config | null = null;

export async function load() {
  if (!config) {
    config = await configurationApi.getConfig();
  }

  return {
    config,
  };
}
