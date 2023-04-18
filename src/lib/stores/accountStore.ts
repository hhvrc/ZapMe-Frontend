import type { AccountDto } from "$lib/api";
import { persisted } from "svelte-local-storage-store";

export const AccountStore = persisted<AccountDto | null>('account', null, { storage: 'session' });