// Stores.ts, svelte stores for application state

import { writable } from "svelte/store";
import type { User } from "./models";

export const ThemeStore = writable<string | null>(null);
export const SessionStore = writable<string | null>(null);
export const IsAuthenticatedStore = writable<boolean>(false);
export const UserStore = writable<User | null>(null);
