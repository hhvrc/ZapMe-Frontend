import { SessionTokenStore } from './stores';
import { browser } from '$app/environment';
import { PUBLIC_BACKEND_API_BASE_URL } from '$env/static/public';
import {
  AccountApi,
  AuthApi,
  ConfigApi,
  Configuration,
  HealthApi,
  SingleSignOnApi,
  UserApi,
  WebSocketApi,
} from '$lib/api';

export const DefaultApiConfiguration = new Configuration({
  basePath: PUBLIC_BACKEND_API_BASE_URL,
  credentials: 'include',
  apiKey: (key) => {
    try {
      if (!browser || key !== 'Authorization') return '';
      const session = SessionTokenStore.get();
      return session ? `Bearer ${session.jwtToken}` : '';
    } catch (e) {
      console.error('[fetchSingleton.ts] Error getting session token', e);
      return '';
    }
  },
});

export const accountApi = new AccountApi(DefaultApiConfiguration);
export const authenticationApi = new AuthApi(DefaultApiConfiguration);
export const configurationApi = new ConfigApi(DefaultApiConfiguration);
export const healthApi = new HealthApi(DefaultApiConfiguration);
export const singleSignOnApi = new SingleSignOnApi(DefaultApiConfiguration);
export const userApi = new UserApi(DefaultApiConfiguration);
export const websocketApi = new WebSocketApi(DefaultApiConfiguration);
