import type { MouseEvent as ReactMouseEvent } from 'react';

/**
 * Attach to any element carrying the .liquid-glass class to make
 * its specular sheen track the cursor — updates the CSS vars
 * --lg-mx and --lg-my (consumed by the .liquid-glass::before
 * radial gradient defined in index.css).
 */
export function trackLiquidGlassCursor(event: ReactMouseEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty('--lg-mx', `${x}%`);
  el.style.setProperty('--lg-my', `${y}%`);
}

/**
 * Convert `#RRGGBB`, `#RGB`, or `rgb(r,g,b)` into the `"r, g, b"`
 * triple form used by CSS `rgb()` and `color-mix()` — the format
 * --lg-accent expects.
 *
 * Returns null on parse failure so callers can skip setting the
 * var rather than emit invalid CSS.
 */
export function hexToRgbTriple(input: string): string | null {
  const trimmed = input.trim();
  const hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  const rgbMatch = trimmed.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i);
  if (rgbMatch) return `${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}`;
  return null;
}
