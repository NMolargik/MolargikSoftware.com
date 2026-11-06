import { APP_STORE_PT } from '../config/site';

/**
 * Appends Apple campaign parameters to an App Store URL:
 *   ?pt=<provider token>&ct=<channel>&mt=8
 * `pt` is omitted while APP_STORE_PT is empty. Existing query parameters on
 * the base URL (for example `?platform=mac`) are preserved.
 */
export function appStoreLink(baseUrl: string, channel: string): string {
  const url = new URL(baseUrl);
  if (APP_STORE_PT) url.searchParams.set('pt', APP_STORE_PT);
  url.searchParams.set('ct', channel);
  url.searchParams.set('mt', '8');
  return url.toString();
}

/** Channel name for links rendered on a site page: `site_<page>`. */
export function siteChannel(page: string): string {
  return `site_${page.replace(/^\/+/, '').replace(/[^a-z0-9]+/gi, '_').toLowerCase() || 'home'}`;
}
