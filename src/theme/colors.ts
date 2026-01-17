/**
 * Centralized brand color configuration
 * Source: Opalite Portfolio (App Color Portfolio.pdf)
 */

// Molargik Software Brand Colors
export const brand = {
  orange: '#FF6C00',
  purple: '#6D00FF',
} as const;

// App-specific color palettes
export const appColors = {
  mygra: {
    blue: '#6CB8F4',
    purple: '#6E60FF',
    white: '#FFFFFF',
    // Primary accent for UI
    accent: '#6E60FF',
  },
  opalite: {
    blue: '#BBEBFC',
    purple: '#9F95AF',
    tan: '#DCD5CF',
    // Primary accent for UI
    accent: '#BBEBFC',
  },
  setdeck: {
    blueEnd: '#113054',
    blueStart: '#66ACF3',
    greenEnd: '#22521F',
    greenStart: '#65DA92',
    orangeEnd: '#8F2F15',
    orangeStart: '#ED9C4E',
    purpleEnd: '#8C268F',
    purpleStart: '#B260EA',
    // Primary accent for UI (using green start as it was already in use)
    accent: '#65DA92',
  },
  stork: {
    blue: '#4EABFF',
    orange: '#E8672B',
    pink: '#E971FF',
    purple: '#6036FF',
    // Primary accent for UI
    accent: '#E8672B',
  },
  waffle: {
    primary: '#F1E094',
    secondary: '#DFA656',
    tertiary: '#44201A',
    // Primary accent for UI
    accent: '#DFA656',
  },
} as const;

// Page accent colors used for nav highlighting and focus states
export const pageAccents = {
  home: '#38bdf8', // sky-400
  opalite: appColors.opalite.accent,
  setdeck: appColors.setdeck.accent,
  mygra: appColors.mygra.accent,
  stork: appColors.stork.accent,
  waffle: appColors.waffle.accent,
  about: '#3B82F6', // blue-500
  contact: brand.orange,
} as const;

// Navbar link colors
export const navLinkColors = {
  opalite: appColors.opalite.accent,
  setdeck: appColors.setdeck.accent,
  mygra: appColors.mygra.purple,
  stork: appColors.stork.orange,
  waffle: appColors.waffle.secondary,
  about: '#3B82F6',
} as const;

// Type exports for strict typing
export type AppName = keyof typeof appColors;
export type PageName = keyof typeof pageAccents;
