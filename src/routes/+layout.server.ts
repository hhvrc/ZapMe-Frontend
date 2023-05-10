import { ConfigApi, type Config } from '$lib/api';
import { RuntimeApiConfiguration } from '$lib/fetchSingleton';

const configApi = new ConfigApi(RuntimeApiConfiguration);

let config: Config | null = null;

export async function load() {
  if (!config) {
    config = await configApi.getConfig();
  }

  return {
    config,
  };
}
