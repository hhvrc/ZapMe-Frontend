import { type AccountDto } from '$lib/api';
import { accountApi } from '$lib/fetchSingleton';
import { handleFetchError } from '$lib/helpers/errorDetailsHelpers';
import { writable } from 'svelte/store';

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
