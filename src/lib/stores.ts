import { get, writable } from "svelte/store";
import type { Account, SessionToken } from "$types";
import type { Config } from "./api";
import { persisted } from "svelte-local-storage-store";

export const ApiConfigStore = writable<Config | null>(null);
export const AccountStore = writable<Account | null>(null);
export const SessionTokenStore = persisted<SessionToken | null>('session', null);