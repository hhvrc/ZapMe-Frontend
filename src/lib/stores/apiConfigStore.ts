import type { Config } from "$lib/api";
import { configApi } from "$lib/fetchSingleton";
import { writable, type Readable } from "svelte/store";

const { set, subscribe } = writable<Config | null>(null);

export const ApiConfigStore: Readable<Config | null> = { subscribe };
