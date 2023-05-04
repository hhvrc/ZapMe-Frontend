import type { Config } from '$lib/api';
import { configApi } from '$lib/fetchSingleton.js';

let config: Config | null = null;

export async function load() {
  if (!config) {
    config = await configApi.getConfig();
  }

  return {
    config,
  };
}