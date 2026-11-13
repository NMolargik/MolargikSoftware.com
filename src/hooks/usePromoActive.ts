import { useSyncExternalStore } from 'react';
import type { Promo } from '../data/apps';
import { isPromoActive } from '../data/apps';

const noopSubscribe = () => () => {};

/**
 * Whether `promo` is running. The prerendered HTML and the first client
 * render both judge it as of the build time (`__BUILD_ISO__`) so hydration
 * matches; right after hydration the client re-checks against the real clock,
 * so an expired sale banner disappears without a redeploy.
 */
export function usePromoActive(promo: Promo | undefined): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => isPromoActive(promo),
    () => isPromoActive(promo, new Date(__BUILD_ISO__)),
  );
}
