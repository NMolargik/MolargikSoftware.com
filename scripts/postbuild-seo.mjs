#!/usr/bin/env node
// postbuild-seo.mjs
//
// Runs after `vite build`. Using src/seo/routes.mjs it:
//   - writes dist/<route>.html for every route with that route's <title>,
//     description, canonical, Open Graph, and Twitter tags baked into <head>
//     (GitHub Pages serves `maestro.html` at `/maestro` with no redirect)
//   - writes dist/404.html (SPA fallback for unknown paths, marked noindex)
//   - writes dist/sitemap.xml and dist/robots.txt
//
// The React app repeats the same tags on client-side navigation (usePageMeta).

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes, defaultRoute, SITE_URL } from '../src/seo/routes.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const START = '<!--seo:start-->';
const END = '<!--seo:end-->';

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const absolute = (url) => (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`);

function canonicalFor(routePath) {
  return routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
}

function headFor(route, { noindex = Boolean(route.noindex) } = {}) {
  const canonical = canonicalFor(route.path);
  const image = absolute(route.ogImage);
  const jsonLd = (route.jsonLd ?? []).map(
    (obj) => `<script type="application/ld+json" data-route-jsonld>${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`,
  );
  return [
    `<title>${escape(route.title)}</title>`,
    `<meta name="description" content="${escape(route.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
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

function render(template, route, opts) {
  const start = template.indexOf(START);
  const end = template.indexOf(END);
  if (start === -1 || end === -1) {
    throw new Error(`dist/index.html is missing the ${START} / ${END} markers`);
  }
  return template.slice(0, start) + headFor(route, opts) + template.slice(end + END.length);
}

function fileFor(routePath) {
  if (routePath === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, `${routePath.replace(/^\//, '')}.html`);
}

async function main() {
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
  const today = new Date().toISOString().slice(0, 10);

  for (const route of routes) {
    const out = fileFor(route.path);
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, render(template, route));
    console.log(`  ${path.relative(ROOT, out)}`);
  }

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
