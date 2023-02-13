import { writable } from 'svelte/store'

export type Theme = {
  name: string;
  colors: {
    fg: string;
    bg: string;
    inv: string;
    text: string;
    litext: string;
  };
};

export const DefaultThemes: Theme[] = [
  {
    name: 'dark',
    colors: {
      fg: '#bbb',
      bg: '#222',
      inv: '#000',
      text: '#fff',
      litext: '#eee'
    },
  },
  {
    name: 'light',
    colors: {
      fg: '#222',
      bg: '#fff',
      inv: '#fff',
      text: '#000',
      litext: '#333'
    },
  }
];

export let CurrentTheme = writable<Theme|null>(null);

export function SetTheme(themeName: string) {
  let theme = DefaultThemes.find((t) => t.name === themeName);
  if (theme) CurrentTheme.set(theme);
}

export function SetCustomTheme(theme: Theme) {
  CurrentTheme.set(theme);
}

function ApplyThemeToDOM(theme: Theme) {
  for (let [prop, color] of Object.entries(theme.colors)) {
    document.documentElement.style.setProperty(`--theme-${prop}`, color);
  }
  document.documentElement.style.setProperty('--theme-name', theme.name);
}

const unsubscribe = CurrentTheme.subscribe((theme) => {
  if (!theme) theme = DefaultThemes[0];
  ApplyThemeToDOM(theme);
});