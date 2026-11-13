#!/usr/bin/env node
// postbuild-seo.mjs
//
// Runs after `vite build`. Using src/seo/routes.mjs it:
//   - writes dist/<route>.html for every route with that route's <title>,
//     description, canonical, Open Graph, and Twitter tags baked into <head>
//     (GitHub Pages serves `maestro.html` at `/maestro` with no redirect)
//   - renders each route's page to static HTML (dist-ssr/entry-server.js, built by
//     `vite build --ssr`) and puts it in <div id="root">, so crawlers that do not run
//     JavaScript see the real content; the client hydrates it (src/main.tsx)
//   - writes dist/404.html (SPA fallback for unknown paths, marked noindex)
//   - writes dist/sitemap.xml and dist/robots.txt
//
// The React app repeats the same tags on client-side navigation (usePageMeta).

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { routes, defaultRoute, SITE_URL, findRoute } from '../src/seo/routes.mjs';
import { apps } from '../src/data/catalog.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const DIST_SSR = path.join(ROOT, 'dist-ssr');
const START = '<!--seo:start-->';
const END = '<!--seo:end-->';
const ROOT_EMPTY = '<div id="root"></div>';

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const absolute = (url) => (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`);

function canonicalFor(routePath) {
  return routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
}

function headFor(route, { noindex = Boolean(route.noindex), robots } = {}) {
  const canonical = canonicalFor(route.path);
  const image = absolute(route.ogImage);
  const jsonLd = (route.jsonLd ?? []).map(
    (obj) => `<script type="application/ld+json" data-route-jsonld>${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`,
  );
  return [
    `<title>${escape(route.title)}</title>`,
    `<meta name="description" content="${escape(route.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="${robots ?? (noindex ? 'noindex, nofollow' : 'index, follow')}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Molargik Software" />`,
    `<meta property="og:title" content="${escape(route.title)}" />`,
    `<meta property="og:description" content="${escape(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(route.title)}" />`,
    `<meta name="twitter:description" content="${escape(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...jsonLd,
  ].join('\n    ');
}

function render(template, route, opts, body = '') {
  const start = template.indexOf(START);
  const end = template.indexOf(END);
  if (start === -1 || end === -1) {
    throw new Error(`dist/index.html is missing the ${START} / ${END} markers`);
  }
  const html = template.slice(0, start) + headFor(route, opts) + template.slice(end + END.length);
  if (!body) return html;
  if (!html.includes(ROOT_EMPTY)) throw new Error(`dist/index.html is missing ${ROOT_EMPTY}`);
  return html.replace(ROOT_EMPTY, () => `<div id="root" data-prerender="${route.path}">${body}</div>`);
}

function fileFor(routePath) {
  if (routePath === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, `${routePath.replace(/^\//, '')}.html`);
}

/**
 * Static redirect pages for the tracked short links /go/<app>?ct=<channel>.
 * GitHub Pages answers unknown paths with 404.html (HTTP 404), which link
 * checkers, email scanners and link-preview fetchers treat as broken, so each
 * app gets a real page (HTTP 200) instead. The inline script builds exactly the
 * destination src/pages/Go.tsx + src/utils/appStore.ts build: ct sanitised and
 * defaulting to "go", platform=mac picking the Mac App Store URL, then pt (when
 * APP_STORE_PT is set), ct and mt=8 set on the URL. No app bundle is loaded.
 */
async function writeGoPages() {
  const site = await fs.readFile(path.join(ROOT, 'src/config/site.ts'), 'utf8');
  const pt = (site.match(/APP_STORE_PT\s*=\s*'([^']*)'/) ?? [])[1] ?? '';
  for (const app of apps) {
    const route = findRoute(`/${app.slug}`);
    const targets = { web: app.appStoreUrl, mac: app.macAppStoreUrl ?? null };
    const script =
      `(function(){var T=${JSON.stringify(targets).replace(/</g, '\\u003c')},PT=${JSON.stringify(pt)};` +
      `var q=new URLSearchParams(location.search),c=q.get('ct');if(c===null)c='go';` +
      `c=c.replace(/[^a-z0-9_-]/gi,'').slice(0,40)||'go';` +
      `var b=(q.get('platform')==='mac'&&T.mac)?T.mac:T.web,u=new URL(b);` +
      `if(PT)u.searchParams.set('pt',PT);u.searchParams.set('ct',c);u.searchParams.set('mt','8');` +
      `var h=u.toString();document.getElementById('go').href=h;location.replace(h)})();`;
    const fallback = app.appStoreUrl;
    const noscriptUrl = new URL(fallback);
    if (pt) noscriptUrl.searchParams.set('pt', pt);
    noscriptUrl.searchParams.set('ct', 'go');
    noscriptUrl.searchParams.set('mt', '8');
    const html = [
      '<!doctype html>',
      '<html lang="en">',
      '  <head>',
      '    <meta charset="UTF-8" />',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      '    <meta name="theme-color" content="#6D00FF" />',
      `    ${headFor(route, { robots: 'noindex' })}`,
      `    <noscript><meta http-equiv="refresh" content="0; url=${escape(noscriptUrl.toString())}" /></noscript>`,
      '  </head>',
      '  <body style="font-family:-apple-system,system-ui,sans-serif;text-align:center;padding:4rem 1.5rem">',
      `    <h1 style="font-size:1.5rem">Opening ${escape(app.name)} on the App Store…</h1>`,
      `    <p>Not redirected? <a id="go" href="${escape(noscriptUrl.toString())}">Continue to the App Store</a></p>`,
      `    <script>${script}</script>`,
      '  </body>',
      '</html>',
      '',
    ].join('\n');
    const dir = path.join(DIST, 'go');
    await fs.mkdir(path.join(dir, app.slug), { recursive: true });
    await fs.writeFile(path.join(dir, `${app.slug}.html`), html);
    await fs.writeFile(path.join(dir, app.slug, 'index.html'), html);
    console.log(`  dist/go/${app.slug}.html (${Buffer.byteLength(html)} bytes)`);
  }
}

async function main() {
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
  const today = new Date().toISOString().slice(0, 10);

  const { render: renderApp } = await import(pathToFileURL(path.join(DIST_SSR, 'entry-server.js')).href);

  for (const route of routes) {
    const body = await renderApp(route.path);
    const html = render(template, route, undefined, body);
    const out = fileFor(route.path);
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, html);
    console.log(`  ${path.relative(ROOT, out)} (${Buffer.byteLength(html)} bytes)`);
    // GitHub Pages serves guides.html at /guides but may redirect to /guides/ when a
    // guides/ directory exists, so the hub also gets guides/index.html. Either way it resolves.
    if (route.path === '/guides') {
      await fs.mkdir(path.join(DIST, 'guides'), { recursive: true });
      await fs.writeFile(path.join(DIST, 'guides', 'index.html'), html);
      console.log('  dist/guides/index.html');
    }
  }

  await writeGoPages();

  // SPA fallback: unknown URLs (for example /go/maestro) load the app shell.
  await fs.writeFile(path.join(DIST, '404.html'), render(template, defaultRoute, { noindex: true }));
  console.log('  dist/404.html');

  const indexable = routes.filter((r) => !r.noindex);
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...indexable.map((r) =>
      [
        '  <url>',
        `    <loc>${canonicalFor(r.path)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        r.changefreq ? `    <changefreq>${r.changefreq}</changefreq>` : null,
        r.priority !== undefined ? `    <priority>${r.priority.toFixed(1)}</priority>` : null,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n'),
    ),
    '</urlset>',
    '',
  ].join('\n');
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap);

  const robots = ['User-agent: *', 'Allow: /', 'Disallow: /go/', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n');
  await fs.writeFile(path.join(DIST, 'robots.txt'), robots);
  console.log('  dist/sitemap.xml, dist/robots.txt');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
