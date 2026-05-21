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
