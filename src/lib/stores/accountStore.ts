import { AccountApi, type AccountDto } from '$lib/api';
import { RuntimeApiConfiguration } from '$lib/fetchSingleton';
import { writable } from 'svelte/store';

const accountApi = new AccountApi(RuntimeApiConfiguration);

const store = writable({
  account: null as AccountDto | null,
  lastFetch: 0,
});

export const AccountStore = {
  ...store,
  fetch: async () => {
    accountApi.getAccount().then((account) => {
      store.update(() => {
        return {
          account: account,
          lastFetch: Date.now(),
        };
      });
    });
  },
};
