import { useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { findApp } from '../data/apps';
import { appStoreLink } from '../utils/appStore';
import { usePageMeta } from '../hooks';
import NotFound from './NotFound';

/**
 * Short tracked links for social posts and printed material:
 *
 *   molargiksoftware.com/go/maestro?ct=x            -> App Store with ct=x
 *   molargiksoftware.com/go/opalite?ct=x&platform=mac -> Mac App Store
 *
 * `ct` defaults to `go` so an untagged link still shows up in App Analytics.
 */
export default function Go() {
  const { app: slug = '' } = useParams();
  const [params] = useSearchParams();
  const app = findApp(slug.toLowerCase());

  const target = useMemo(() => {
    if (!app) return null;
    const channel = (params.get('ct') ?? 'go').replace(/[^a-z0-9_-]/gi, '').slice(0, 40) || 'go';
    const wantsMac = params.get('platform') === 'mac' && app.macAppStoreUrl;
    return appStoreLink(wantsMac ? app.macAppStoreUrl! : app.appStoreUrl, channel);
  }, [app, params]);

  usePageMeta({
    title: app ? `Get ${app.name} on the App Store` : 'Not found',
    description: app?.job ?? '',
    noindex: true,
  });

  useEffect(() => {
    if (target) window.location.replace(target);
  }, [target]);

  if (!app || !target) return <NotFound />;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center pt-20">
      <img src={app.icon} alt="" width={96} height={96} className="w-24 h-24 rounded-[1.5rem] shadow-lg mb-6" />
      <h1 className="text-2xl font-semibold text-gray-900">Opening {app.name} on the App Store…</h1>
      <p className="mt-3 text-gray-500">
        Not redirected?{' '}
        <a href={target} className="text-brandPurple underline underline-offset-4">
          Continue to the App Store
        </a>
      </p>
    </div>
  );
}
