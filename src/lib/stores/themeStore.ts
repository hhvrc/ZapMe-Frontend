import { DefaultThemes } from '$lib/themes';
import { persisted } from 'svelte-local-storage-store';

export const ThemeStore = persisted<string>('themeCurrent', DefaultThemes[0].name, {
  storage: 'local',
});
