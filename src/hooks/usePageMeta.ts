import { useEffect } from 'react';
import { SITE_URL } from '../config/site';

interface PageMetaOptions {
  title: string;
  description: string;
  /** Drives the --accent CSS variable; defaults to brand purple. */
  accentColor?: string;
  preloadImage?: string;
  /** Site-relative or absolute URL of a 1200x630 preview image. */
  image?: string;
  /** Route path for the canonical URL; defaults to the current pathname. */
  path?: string;
  noindex?: boolean;
}

function upsertMeta(selector: string, create: () => HTMLMetaElement | HTMLLinkElement, attr: 'content' | 'href', value: string) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function meta(name: string, value: string, byProperty = false) {
  const key = byProperty ? 'property' : 'name';
  upsertMeta(
    `meta[${key}="${name}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute(key, name);
      return m;
    },
    'content',
    value,
  );
}

function absolute(url: string): string {
  return /^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

/**
 * Keeps the document <head> in step with the current route on the client:
 * title, description, canonical, Open Graph, and Twitter card tags. The
 * build writes the same tags into each route's HTML (scripts/postbuild-seo.mjs),
 * so this only matters after client-side navigation.
 */
export function usePageMeta({
  title,
  description,
  accentColor = '#6D00FF',
  preloadImage,
  image = '/og/default.png',
  path,
  noindex = false,
}: PageMetaOptions) {
  useEffect(() => {
    const routePath = (path ?? window.location.pathname).replace(/\/+$/, '') || '/';
    const canonical = routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
    const imageUrl = absolute(image);

    document.title = title;
    meta('description', description);
    upsertMeta(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link');
        l.rel = 'canonical';
        return l;
      },
      'href',
      canonical,
    );
    meta('og:type', 'website', true);
    meta('og:site_name', 'Molargik Software', true);
    meta('og:title', title, true);
    meta('og:description', description, true);
    meta('og:url', canonical, true);
    meta('og:image', imageUrl, true);
    meta('twitter:card', 'summary_large_image');
    meta('twitter:title', title);
    meta('twitter:description', description);
    meta('twitter:image', imageUrl);
    meta('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    document.documentElement.style.setProperty('--accent', accentColor);

    let link: HTMLLinkElement | null = null;
    if (preloadImage) {
      link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = preloadImage;
      document.head.appendChild(link);
    }

    return () => {
      if (link) document.head.removeChild(link);
    };
  }, [title, description, accentColor, preloadImage, image, path, noindex]);
}
