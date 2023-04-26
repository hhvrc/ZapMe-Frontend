import { persisted } from 'svelte-local-storage-store';

export const ThemeStore = persisted('themeCurrent', 'skeleton', {
  storage: 'local',
});
