// Stores.ts, svelte stores for application state

import { writable } from 'svelte/store';
import type { User } from './models';

const ThemeStore = writable<string | null>(null);
const SessionStore = writable<string | null>(null);
const UserStore = writable<User | null>(null);

export { ThemeStore, SessionStore, UserStore };
