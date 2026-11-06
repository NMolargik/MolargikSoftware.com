// The app catalog: one entry per shipping app. Plain ESM so that both the
// React app (via src/data/apps.ts) and the build scripts (OG images,
// prerendered <head>, sitemap, press kit) read the same facts.
//
// Keep copy here short and factual; the long-form marketing copy stays in
// each page under src/pages/.

export const SITE_URL = 'https://molargiksoftware.com';

/** @type {import('./catalog.d.mts').CatalogApp[]} */
export const apps = [
  {
    slug: 'maestro',
    name: 'Maestro',
    storeName: 'Maestro: Light Show Studio',
    source: 'Maestro',
    job: 'Turn any song into a Tesla light show, choreographed on your iPhone, iPad, or Mac.',
    description:
      'Maestro turns any song into a Tesla light show. On-device signal processing, a hardware-accurate fleet preview, a channel-level Sequence Editor on the Mac, and USB-ready exports. No AI, nothing uploaded.',
    accent: '#2D7FF9',
    appStoreUrl: 'https://apps.apple.com/us/app/maestro-light-show-studio/id6803264666',
    macAppStoreUrl: 'https://apps.apple.com/us/app/maestro-light-show-studio/id6803264666?platform=mac',
    platforms: ['iPhone', 'iPad', 'Mac'],
    languages: ['English', 'Spanish', 'German', 'Dutch', 'Norwegian'],
    price: 'Free to try, $12.99 one-time unlock',
    priceDetail: 'A sample show and your first two exports are free. One purchase unlocks unlimited shows and exports on every device. No subscription.',
    promo: {
      label: 'Launch promo: unlock Maestro for $4.99 through November 23',
      start: '2026-11-09',
      end: '2026-11-23',
    },
    category: 'EntertainmentApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [],
  },
  {
    slug: 'opalite',
    name: 'Opalite',
    storeName: 'Opalite - Color Studio',
    source: 'Opalite',
    job: 'Pick, organize, check, and export colors on every Apple device you own.',
    description:
      'Pick colors from photos, check WCAG contrast, simulate color blindness, draw on a canvas, and export palettes to Procreate, SwiftUI, CSS, and Adobe on iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro.',
    accent: '#9F95AF',
    appStoreUrl: 'https://apps.apple.com/us/app/opalite-color-studio/id6755093664',
    macAppStoreUrl: 'https://apps.apple.com/us/app/opalite-color-studio/id6755093664?platform=mac',
    platforms: ['iPhone', 'iPad', 'Mac', 'Apple Watch', 'Apple TV', 'Vision Pro'],
    languages: ['English', 'Spanish', 'French (Canada)', 'Japanese'],
    price: 'Free, Onyx $9.99 one-time',
    priceDetail: 'Unlimited colors, every picker, and the contrast checker are free. Onyx adds unlimited palettes, the canvas, community downloads, and export for a single $9.99 purchase.',
    category: 'DesignApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [
      { quote: 'Fantastic for artists', source: 'App Store review' },
      { quote: 'My go to palette tool', source: 'App Store review' },
      { quote: 'Helpful desktop app for marketing', source: 'App Store review' },
    ],
  },
  {
    slug: 'setdeck',
    name: 'SetDeck',
    storeName: 'SetDeck',
    source: 'SetDeck',
    job: 'Plan the training week, log every set, and watch the numbers climb.',
    description:
      'Plan your training week, log every set, and watch the numbers climb. SetDeck tracks routines, history, stats, achievements, hydration, and calories with Apple Watch, Siri, and Apple Health.',
    accent: '#3CB371',
    appStoreUrl: 'https://apps.apple.com/us/app/setdeck/id6484503374',
    platforms: ['iPhone', 'iPad', 'Apple Watch', 'Vision Pro'],
    languages: ['English', 'Spanish', 'French (Canada)', 'Japanese'],
    price: 'Free',
    priceDetail: 'Every feature is free. No accounts, no ads, no upsell.',
    category: 'HealthApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [],
  },
  {
    slug: 'mygra',
    name: 'Mygra',
    storeName: 'Mygra',
    source: 'Mygra',
    job: 'Log migraines in seconds and let on-device intelligence find the patterns.',
    description:
      'Log migraines in seconds, let on-device Apple Intelligence explain what may have contributed, and watch the trends emerge. Weather correlations, Apple Health, Apple Watch, Siri, and iCloud sync. Private by design.',
    accent: '#6E60FF',
    appStoreUrl: 'https://apps.apple.com/us/app/mygra/id6747298583',
    platforms: ['iPhone', 'iPad', 'Mac', 'Apple Watch', 'Vision Pro'],
    languages: ['English', 'Spanish', 'French (Canada)', 'Japanese'],
    price: 'Free, Mygra Plus from $2.99/mo',
    priceDetail: 'Logging, history, and Apple Health are free. Mygra Plus is $2.99 a month or $14.99 a year with a 7-day free trial, or $29.99 once.',
    category: 'HealthApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [{ quote: 'Great app, nice improvements', source: 'App Store review' }],
  },
  {
    slug: 'stork',
    name: 'Stork',
    storeName: 'Stork - Delivery Stats',
    source: 'Stork',
    job: 'Track the deliveries you perform, visualize trends, and celebrate every birth.',
    description:
      'Track the deliveries you perform, visualize trends, and celebrate every birth with Stork, the privacy-first companion for L&D nurses, midwives, and OB-GYNs.',
    accent: '#E8672B',
    appStoreUrl: 'https://apps.apple.com/us/app/stork-delivery-stats/id6740038476',
    platforms: ['iPhone', 'iPad', 'Mac', 'Apple Watch', 'Vision Pro'],
    languages: ['English', 'Spanish', 'French (Canada)', 'Japanese'],
    price: 'Free, Stork Pro $4.99 one-time',
    priceDetail: 'Log deliveries and see your dashboard for free. Stork Pro unlocks the full stats suite, share cards, and PDF/CSV export for a single $4.99 purchase.',
    category: 'MedicalApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [],
  },
  {
    slug: 'waffle',
    name: 'Waffle',
    storeName: 'Waffle Browser',
    source: 'Waffle',
    job: 'Browse the web in a grid of live pages on iPad, not in a pile of tabs.',
    description:
      'Waffle turns your iPad into a grid of live webpages. Browse sites side by side in a split-screen grid, save preset layouts, pop cells into their own windows, and sync with iCloud.',
    accent: '#C98A2E',
    appStoreUrl: 'https://apps.apple.com/us/app/waffle-browser/id6751783473',
    platforms: ['iPad'],
    languages: ['English', 'Spanish', 'French (Canada)', 'Japanese'],
    price: 'Free, Syrup $2.99 one-time',
    priceDetail: 'The grid browser is free. Syrup unlocks larger grids, presets, and pop-out windows for a single $2.99 purchase.',
    category: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
    testimonials: [],
  },
];

/** @param {string} slug */
export function findApp(slug) {
  return apps.find((a) => a.slug === slug);
}
