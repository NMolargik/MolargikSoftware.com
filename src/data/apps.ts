import { apps as catalog, findApp as findCatalogApp } from './catalog.mjs';
import type { CatalogApp, Promo } from './catalog.d.mts';
import maestroIcon from '../assets/maestro/icon.png';
import opaliteIcon from '../assets/opalite/icon.png';
import setdeckIcon from '../assets/setdeck/icon.png';
import mygraIcon from '../assets/mygra/icon.png';
import storkIcon from '../assets/stork/icon.png';
import waffleIcon from '../assets/waffle/icon.png';

export type { CatalogApp, Promo, Testimonial } from './catalog.d.mts';

const icons: Record<string, string> = {
  maestro: maestroIcon,
  opalite: opaliteIcon,
  setdeck: setdeckIcon,
  mygra: mygraIcon,
  stork: storkIcon,
  waffle: waffleIcon,
};

export interface SiteApp extends CatalogApp {
  icon: string;
  path: string;
}

/** Every shipping app, in display order, with its bundled icon and route. */
export const apps: SiteApp[] = catalog.map((app) => ({
  ...app,
  icon: icons[app.slug],
  path: `/${app.slug}`,
}));

export function findApp(slug: string): SiteApp | undefined {
  const base = findCatalogApp(slug);
  return base ? { ...base, icon: icons[base.slug], path: `/${base.slug}` } : undefined;
}

/** True while `promo` is running (inclusive of both end dates, local time). */
export function isPromoActive(promo: Promo | undefined, now: Date = new Date()): boolean {
  if (!promo) return false;
  const start = new Date(`${promo.start}T00:00:00`);
  const end = new Date(`${promo.end}T23:59:59.999`);
  return now >= start && now <= end;
}
