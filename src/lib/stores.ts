import { get, writable } from "svelte/store";
import type { Account, SessionToken } from "../models/index";

export const IsSidebarOpenStore = writable<boolean>(false);

export const AccountStore = writable<Account | null>(null);
export const SessionTokenStore = writable<SessionToken | null>(null);

export const IsAccountLoaded = () => get(AccountStore) !== null;
export const IsAuthenticated = () => get(SessionTokenStore) !== null;