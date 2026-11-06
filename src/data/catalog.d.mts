export interface Testimonial {
  quote: string;
  source: string;
}

export interface Promo {
  label: string;
  /** ISO date (inclusive) */
  start: string;
  /** ISO date (inclusive) */
  end: string;
}

export interface CatalogApp {
  slug: string;
  name: string;
  storeName: string;
  /** Folder name under ../../Apps */
  source: string;
  job: string;
  description: string;
  accent: string;
  appStoreUrl: string;
  macAppStoreUrl?: string;
  platforms: string[];
  languages: string[];
  price: string;
  priceDetail: string;
  promo?: Promo;
  category: string;
  offers: { price: string; priceCurrency: string };
  testimonials: Testimonial[];
}

export const SITE_URL: string;
export const apps: CatalogApp[];
export function findApp(slug: string): CatalogApp | undefined;
