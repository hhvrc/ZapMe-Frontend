import type { UserDto } from '$lib/api';
import { writable } from 'svelte/store';

export const UsersStore = writable<UserDto[]>([]);
