/**
 * Color utility functions for Opalite Web
 * Handles color conversions, harmonies, and display formatting
 */

import type { OpaliteColor, ColorRepresentations, ColorHarmony, HarmonyType } from '../types/opalite';

/**
 * Convert sRGB (0-1) color to all display representations
 */
export function colorToRepresentations(color: OpaliteColor): ColorRepresentations {
  const r = Math.round(color.red * 255);
  const g = Math.round(color.green * 255);
  const b = Math.round(color.blue * 255);
  const a = Math.round(color.alpha * 255);

  const hsl = rgbToHsl(r, g, b);

  return {
    hex: rgbToHex(r, g, b),
    hexWithAlpha: rgbToHex(r, g, b) + componentToHex(a),
    rgb: { r, g, b },
    hsl,
    rgbString: `rgb(${r}, ${g}, ${b})`,
    rgbaString: `rgba(${r}, ${g}, ${b}, ${color.alpha.toFixed(2)})`,
    hslString: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
  };
}

/**
 * Convert RGB (0-255) to hex string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Convert single component (0-255) to 2-digit hex
 */
function componentToHex(c: number): string {
  const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

/**
 * Convert RGB (0-255) to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: l * 100 };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  switch (max) {
    case rNorm:
      h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
      break;
    case gNorm:
      h = ((bNorm - rNorm) / d + 2) / 6;
      break;
    default:
      h = ((rNorm - gNorm) / d + 4) / 6;
      break;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to RGB (0-255)
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return { r: val, g: val, b: val };
  }

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  const hueToRgb = (t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  return {
    r: Math.round(hueToRgb(hNorm + 1 / 3) * 255),
    g: Math.round(hueToRgb(hNorm) * 255),
    b: Math.round(hueToRgb(hNorm - 1 / 3) * 255),
  };
}

/**
 * Get optimal text color (black or white) for contrast against a background
 */
export function getContrastColor(hex: string): 'white' | 'black' {
  const luminance = getRelativeLuminance(hex);
  return luminance > 0.179 ? 'black' : 'white';
}

/**
 * Calculate relative luminance (WCAG formula)
 */
export function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const toLinear = (c: number): number => {
    const normalized = c / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * toLinear(rgb.r) + 0.7152 * toLinear(rgb.g) + 0.0722 * toLinear(rgb.b);
}

/**
 * Convert hex string to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate all color harmonies for a given color
 */
export function calculateHarmonies(color: OpaliteColor): ColorHarmony[] {
  const { rgb } = colorToRepresentations(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return [
    {
      type: 'complementary' as HarmonyType,
      label: 'Complementary',
      colors: [rotateHue(hsl, 180)],
    },
    {
      type: 'analogous' as HarmonyType,
      label: 'Analogous',
      colors: [rotateHue(hsl, -30), rotateHue(hsl, 30)],
    },
    {
      type: 'triadic' as HarmonyType,
      label: 'Triadic',
      colors: [rotateHue(hsl, 120), rotateHue(hsl, 240)],
    },
    {
      type: 'split-complementary' as HarmonyType,
      label: 'Split Complementary',
      colors: [rotateHue(hsl, 150), rotateHue(hsl, 210)],
    },
    {
      type: 'tetradic' as HarmonyType,
      label: 'Tetradic',
      colors: [rotateHue(hsl, 90), rotateHue(hsl, 180), rotateHue(hsl, 270)],
    },
  ];
}

/**
 * Rotate hue by degrees and return hex color
 */
function rotateHue(hsl: { h: number; s: number; l: number }, degrees: number): string {
  const newHue = (hsl.h + degrees + 360) % 360;
  const rgb = hslToRgb(newHue, hsl.s, hsl.l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

/**
 * Format date for display (date only, no time)
 */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Get CSS color string from OpaliteColor
 */
export function colorToCss(color: OpaliteColor): string {
  const r = Math.round(color.red * 255);
  const g = Math.round(color.green * 255);
  const b = Math.round(color.blue * 255);
  return color.alpha < 1
    ? `rgba(${r}, ${g}, ${b}, ${color.alpha})`
    : `rgb(${r}, ${g}, ${b})`;
}

/**
 * Get hex color string from OpaliteColor
 */
export function colorToHex(color: OpaliteColor): string {
  const r = Math.round(color.red * 255);
  const g = Math.round(color.green * 255);
  const b = Math.round(color.blue * 255);
  return rgbToHex(r, g, b);
}
