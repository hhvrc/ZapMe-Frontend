import type { ApiConfig } from '$lib/api';
import { writable } from 'svelte/store';

export const ApiConfigStore = writable<ApiConfig | null>(null);
