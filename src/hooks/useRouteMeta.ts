import { useLocation } from 'react-router-dom';
import { findRoute, defaultRoute } from '../seo/routes.mjs';
import { usePageMeta } from './usePageMeta';

/**
 * Applies the route's entry from src/seo/routes.mjs (the same data the build
 * bakes into the HTML). Pages with bespoke needs call usePageMeta directly.
 */
export function useRouteMeta(options: { accentColor?: string; preloadImage?: string } = {}) {
  const { pathname } = useLocation();
  const route = findRoute(pathname) ?? defaultRoute;
  usePageMeta({
    title: route.title,
    description: route.description,
    image: route.ogImage,
    path: route.path,
    noindex: route.noindex,
    ...options,
  });
  return route;
}
