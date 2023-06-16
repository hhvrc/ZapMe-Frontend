import { SessionTokenStore } from './stores';
import { browser } from '$app/environment';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
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
  basePath: PUBLIC_BACKEND_URL,
  credentials: 'include',
  apiKey: (key) => {
    if (!browser || key !== 'Authorization') return '';
    const session = SessionTokenStore.get();
    return session ? `Bearer ${session.jwtToken}` : '';
  },
});

export const accountApi = new AccountApi(DefaultApiConfiguration);
export const authenticationApi = new AuthApi(DefaultApiConfiguration);
export const configurationApi = new ConfigApi(DefaultApiConfiguration);
export const healthApi = new HealthApi(DefaultApiConfiguration);
export const singleSignOnApi = new SingleSignOnApi(DefaultApiConfiguration);
export const userApi = new UserApi(DefaultApiConfiguration);
export const websocketApi = new WebSocketApi(DefaultApiConfiguration);
