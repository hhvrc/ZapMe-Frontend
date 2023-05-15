import { AccountApi, type AccountDto } from '$lib/api';
import { RuntimeApiConfiguration } from '$lib/fetchSingleton';
import { handleFetchError } from '$lib/helpers/errorDetailsHelpers';
import { writable } from 'svelte/store';

const accountApi = new AccountApi(RuntimeApiConfiguration);

const store = writable({
  account: null as AccountDto | null,
  lastFetch: 0,
});

function setAccount(account: AccountDto) {
  store.update((s) => ({ ...s, account, lastFetch: Date.now() }));
}

function fetchAccount() {
  accountApi.getAccount().then(setAccount).catch(handleFetchError);
}

export const AccountStore = {
  ...store,
  setAccount,
  fetchAccount,
};
