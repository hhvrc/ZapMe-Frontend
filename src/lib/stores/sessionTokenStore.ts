import type { SessionDto } from '$lib/api';
import { persisted } from 'svelte-local-storage-store';

export const SessionTokenStore = persisted<SessionDto | null>('session', null, {
  storage: 'local',
});
