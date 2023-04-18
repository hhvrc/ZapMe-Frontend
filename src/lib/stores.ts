import type { AccountDto, Config, SessionDto } from "./api";
import { persisted } from "svelte-local-storage-store";

export const ApiConfigStore = persisted<Config | null>('config', null, { storage: 'session' });
export const AccountStore = persisted<AccountDto | null>('account', null, { storage: 'session' });
export const SessionTokenStore = persisted<SessionDto | null>('session', null, { storage: 'local' });