import type { AccountDto } from "$lib/api";
import { accountApi } from "$lib/fetchSingleton";
import { writable } from "svelte/store";

const store = writable({
  account: null as AccountDto | null,
  lastFetch: 0,
});

export const AccountStore = {
  ...store,
  fetch: async () => {
    accountApi.getAccount().then((account) => {
      store.update((_) => {
        return {
          account: account,
          lastFetch: Date.now(),
        };
      });
    });
  }
}