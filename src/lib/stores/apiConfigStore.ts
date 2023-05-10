import type { Config } from '$lib/api';
import { writable } from 'svelte/store';

export const ApiConfigStore = writable<Config | null>(null);
