import { browser } from '$app/environment';
import { StringSerializer } from './serializers';
import { persisted } from 'svelte-local-storage-store';
import { get } from 'svelte/store';

/* Base colors, the UI will fade from background to foreground using shades, these must be hex */
export type BaseColors = {
  background: string;
  foreground: string;
};

/* Shades of the base colors, can be a number between 0 and 1, or a hex color to override the base color */
export interface Shades {
  [key: string]: number | string | undefined;
}
export interface BaseShades extends Shades {
  /* Paper is the background shade of most elements */
  paper?: number | string;

  /* Text shades */
  txtPri?: number | string;
  txtSec?: number | string;

  /* Input colors */
  inputText?: number | string;
  inputBg?: number | string;
  inputPlaceholder?: number | string;

  /* Button colors */
  btnText?: number | string;
  btnBg?: number | string;
  btnHovBg?: number | string;
  btnDis?: number | string;
  btnDisBg?: number | string;

  /* Checkbox colors */
  chkBox?: string | number;
  chkBoxTo?: string | number;
  chkBoxSel?: string | number;
  chkBoxSelTo?: string | number;
  chkBoxStroke?: string | number;

  /* Additional shades */
  [key: string]: number | string | undefined;
}

/* Custom colors meant for accenting the UI */
export interface Palette {
  [key: string]: string | undefined;
}
export interface BasePalette extends Palette {
  [key: string]: string | undefined;
}

/* Theme interface */
export interface Theme {
  colors: {
    shades: Shades;
    palette?: Palette;
  };
}
export interface BaseTheme extends Theme {
  colors: {
    shades: BaseShades;
    palette: BasePalette;
  };
}
export interface CustomTheme extends Theme {
  name: 'light' | 'dark' | string;
  colors: {
    base: BaseColors;
    shades: Shades;
    palette?: Palette;
  };
}

export type ThemeConfig = {
  base: BaseTheme;
  customs: CustomTheme[];
};

const baseTheme: BaseTheme = {
  colors: {
    shades: {
      paper: 0.13,

      inputText: 0.87,
      inputBg: 0.07,
      inputHovBg: 0.12,
      inputSelBg: 0.12,
      inputDisBg: 0.02,
      inputPlaceholder: '#cecece',

      btnText: 0.87,
      btnBg: 0.2,
      btnHovBg: 0.4,
      btnDis: 0.3,
      btnDisBg: 0.12,

      chkBox: '#606060',
      chkBoxTo: '#474747',
      chkBoxSel: '#1d52c1',
      chkBoxSelTo: '#255cd2',
      chkBoxStroke: '#fff',

      swiBg: 'darkgray',
      swiBgSel: 'dodgerblue',
      swiBtn: 'white',

      div: 0.12,
    },
    palette: {},
  },
};
const darkTheme: CustomTheme = {
  name: 'dark',
  colors: {
    base: {
      background: '#121212',
      foreground: '#fff',
    },
    shades: {
      txtPri: 1,
      txtSec: 0.7,
      txtDis: 0.5,

      btnBg: 0.2,
      btnHovBg: 0.4,

      chkBox: '#606060',
      chkBoxTo: '#474747',

      swiBtn: 'white',
    },
  },
};
const lightTheme: CustomTheme = {
  name: 'light',
  colors: {
    base: {
      background: '#fff',
      foreground: '#000',
    },
    shades: {
      txtPri: 0.87,
      txtSec: 0.6,
      txtDis: 0.38,

      btnBg: 0.27,
      btnHovBg: 0.47,

      chkBox: '#c8c8c8',
      chkBoxTo: '#b0b0b0',

      swiBtn: 'black',
    },
  },
};

export const defaultThemeConfig: ThemeConfig = {
  base: baseTheme,
  customs: [darkTheme, lightTheme],
};

function AddAlpha(hex: string, alpha: number): string {
  if (alpha >= 1) return hex;
  if (alpha <= 0) return 'transparent';

  if (!hex.startsWith('#')) throw new Error('Invalid hex color');

  // If shorthand hex, convert to full hex
  if (hex.length === 4)
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];

  return `${hex}${Math.round(alpha * 255).toString(16)}`;
}
function ApplyThemeToDOM(selectedTheme: CustomTheme) {
  const name = selectedTheme.name;
  const { foreground, background } = selectedTheme.colors.base;

  const themeMap = new Map<string, string>();

  themeMap.set('name', name);
  themeMap.set('bg', background);
  themeMap.set('fg', foreground);

  // Apply base theme first, then custom theme
  for (const theme of [defaultThemeConfig.base, selectedTheme]) {
    for (let [prop, color] of Object.entries(theme.colors.shades)) {
      if (!color) {
        continue;
      }

      if (typeof color === 'number') {
        color = AddAlpha(foreground, color);
      }

      if (prop === 'name' || prop === 'bg' || prop === 'fg') {
        throw new Error(
          `Invalid theme property name: ${prop}, this is a reserved property name`
        );
      }

      themeMap.set(prop, color);
    }
  }

  for (let [prop, color] of themeMap) {
    document.documentElement.style.setProperty('--thm-' + prop, color);
  }
}
function OnFetchOrUpdateTheme(val: string): string {
  let theme = get(additonalThemes).find((t) => t.name === val);

  if (!theme) {
    switch (val) {
      case 'auto':
      case 'default':
        val = 'dark';
      case 'dark':
        theme = darkTheme;
        break;
      case 'light':
        theme = lightTheme;
        break;
      default:
        throw new Error('Invalid theme');
    }
  }

  ApplyThemeToDOM(theme);

  return val;
}

export const additonalThemes = persisted<CustomTheme[]>('themeAdditionals', []);
export const selectedTheme = persisted<string>('themeSelected', 'dark', {
  serializer: StringSerializer,
});
if (browser) {
  selectedTheme.subscribe(OnFetchOrUpdateTheme);
}
