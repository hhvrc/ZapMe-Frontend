import { DefaultThemes } from '$lib/themes';
import type { Theme } from '$types/Theme';
import { persisted } from 'svelte-local-storage-store';

export const ThemeStore = persisted<Theme>('themeCurrent', DefaultThemes[0], {
  storage: 'local',
});
