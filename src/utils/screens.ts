const naturalCompare = new Intl.Collator('en', { numeric: true, sensitivity: 'base' }).compare;

/**
 * Turns the result of an eager `import.meta.glob` over a screens folder into
 * an ordered list of image URLs. Files are sorted naturally by name, so
 * `02.webp` comes before `10.webp`.
 *
 * Usage:
 *   const screens = screensFromGlob(
 *     import.meta.glob('../assets/stork/screens/*', { eager: true, import: 'default' })
 *   );
 */
export function screensFromGlob(modules: Record<string, unknown>): string[] {
  return Object.keys(modules)
    .sort(naturalCompare)
    .map((key) => modules[key] as string);
}
