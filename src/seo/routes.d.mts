export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  /** Site-relative path to a 1200x630 image */
  ogImage: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  /** Excluded from sitemap and marked noindex */
  noindex?: boolean;
  /** schema.org objects baked into the prerendered <head> as JSON-LD */
  jsonLd?: Record<string, unknown>[];
}

export const SITE_URL: string;
export const routes: RouteMeta[];
export const defaultRoute: RouteMeta;
export function findRoute(path: string): RouteMeta | undefined;
