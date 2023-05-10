import type { AccountDto } from '$lib/api';
import { writable } from 'svelte/store';

export const AccountStore = writable({
  account: null as AccountDto | null,
  lastFetch: 0,
});