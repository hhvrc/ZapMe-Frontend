import ThemeCrimson from '@skeletonlabs/skeleton/themes/theme-crimson.css?raw';
import ThemeGoldNouveau from '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css?raw';
import ThemeHamlindigo from '@skeletonlabs/skeleton/themes/theme-hamlindigo.css?raw';
import ThemeModern from '@skeletonlabs/skeleton/themes/theme-modern.css?raw';
import ThemeRocket from '@skeletonlabs/skeleton/themes/theme-rocket.css?raw';
import ThemeSahara from '@skeletonlabs/skeleton/themes/theme-sahara.css?raw';
import ThemeSeafoam from '@skeletonlabs/skeleton/themes/theme-seafoam.css?raw';
import ThemeSeasonal from '@skeletonlabs/skeleton/themes/theme-seasonal.css?raw';
import ThemeSkeleton from '@skeletonlabs/skeleton/themes/theme-skeleton.css?raw';
import ThemeVintage from '@skeletonlabs/skeleton/themes/theme-vintage.css?raw';
import type { Theme } from '$types/Theme';

export const DefaultThemes: Theme[] = [
  { name: 'Skeleton', icon: '💀', css: ThemeSkeleton },
  { name: 'Modern', icon: '🤖', css: ThemeModern },
  { name: 'Rocket', icon: '🚀', css: ThemeRocket },
  { name: 'Seafoam', icon: '🧜‍♀️', css: ThemeSeafoam },
  { name: 'Vintage', icon: '📺', css: ThemeVintage },
  { name: 'Sahara', icon: '🏜️', css: ThemeSahara },
  { name: 'Hamlindigo', icon: '👔', css: ThemeHamlindigo },
  { name: 'Gold Nouveau', icon: '💫', css: ThemeGoldNouveau },
  { name: 'Crimson', icon: '⭕', css: ThemeCrimson },
  { name: 'Seasonal', icon: '🍂', css: ThemeSeasonal },
];
