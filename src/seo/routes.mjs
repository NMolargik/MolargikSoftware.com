// Per-route <head> metadata. Read by the React app (usePageMeta) at runtime
// and by scripts/postbuild-seo.mjs at build time, which writes one HTML file
// per route with these tags baked in, plus sitemap.xml and robots.txt.

import { apps, SITE_URL } from '../data/catalog.mjs';
import { guides, guidePath, guideJsonLd } from '../data/guides.mjs';

export { SITE_URL };

const SUFFIX = ' | Molargik Software';
const DEFAULT_OG = '/og/default.png';

/** @type {import('./routes.d.mts').RouteMeta[]} */
const staticRoutes = [
  {
    path: '/',
    title: 'Molargik Software: Independent apps for every Apple device',
    description:
      'Independent apps for iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro. Private by design: Maestro, Opalite, SetDeck, Mygra, Stork, and Waffle.',
    ogImage: DEFAULT_OG,
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/about',
    title: `About Nick Molargik${SUFFIX}`,
    description:
      'Nick Molargik is the founder of Molargik Software LLC and a senior iOS engineer. Experience at StreetIQ, V1 Sports, Sweetwater, and Raytheon; résumé, GitHub, and LinkedIn.',
    ogImage: DEFAULT_OG,
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/contact',
    title: `Contact and support${SUFFIX}`,
    description:
      'Reach Molargik Software for app support, press, or partnerships. Replies come from the developer, usually within a day or two.',
    ogImage: DEFAULT_OG,
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    path: '/support',
    title: `Support${SUFFIX}`,
    description:
      'Help for Maestro, Opalite, SetDeck, Mygra, Stork, and Waffle: frequently asked questions, purchases and restores, iCloud sync, and how to reach the developer.',
    ogImage: DEFAULT_OG,
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/press',
    title: `Press kit${SUFFIX}`,
    description:
      'Press kit for Molargik Software: company and founder blurbs, app descriptions, icons, and screenshots for Maestro, Opalite, SetDeck, Mygra, Stork, and Waffle.',
    ogImage: DEFAULT_OG,
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    path: '/privacy',
    title: `Privacy policy${SUFFIX}`,
    description:
      'One privacy policy for every Molargik Software app. What each app stores, what stays on your device or in your private iCloud, and what is never collected or sold.',
    ogImage: DEFAULT_OG,
    changefreq: 'yearly',
    priority: 0.4,
  },
  {
    path: '/opalite-web',
    title: `Opalite Web: your color portfolio${SUFFIX}`,
    description: 'Sign in with your Apple Account to view the colors and palettes synced from Opalite.',
    ogImage: '/og/opalite.png',
    noindex: true,
  },
  {
    path: '/streetiq',
    title: `StreetIQ / SCOUT${SUFFIX}`,
    description: 'Employment: building SCOUT, the native iOS field app behind StreetIQ pavement assessments.',
    ogImage: DEFAULT_OG,
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/v1sports',
    title: `V1 Sports${SUFFIX}`,
    description: 'Employment: mobile engineering for V1 Sports golf and baseball coaching apps.',
    ogImage: DEFAULT_OG,
    changefreq: 'yearly',
    priority: 0.3,
  },
];

/** @type {import('./routes.d.mts').RouteMeta[]} */
const appRoutes = apps.map((app) => ({
  path: `/${app.slug}`,
  title: `${app.storeName} for ${app.platforms.join(', ')}${SUFFIX}`,
  description: app.description,
  ogImage: `/og/${app.slug}.png`,
  changefreq: 'weekly',
  priority: 0.9,
}));

/** Guides hub plus one route per guide (src/data/guides.mjs). */
const guideRoutes = [
  {
    path: '/guides',
    title: `Tesla light show guides${SUFFIX}`,
    description:
      'Plain-language guides to Tesla light shows: how to make one, set up the USB drive, fix a show the car will not see, which lights each Tesla can use, and running several cars at once.',
    ogImage: '/og/maestro.png',
    changefreq: 'monthly',
    priority: 0.8,
  },
  ...guides.map((g) => ({
    path: guidePath(g.slug),
    title: `${g.title}${SUFFIX}`,
    description: g.description,
    ogImage: '/og/maestro.png',
    changefreq: 'monthly',
    priority: 0.8,
    jsonLd: guideJsonLd(g),
  })),
];

export const routes = [...staticRoutes, ...appRoutes, ...guideRoutes];

/** @param {string} path */
export function findRoute(path) {
  const clean = path.replace(/\/+$/, '') || '/';
  return routes.find((r) => r.path === clean);
}

export const defaultRoute = staticRoutes[0];
