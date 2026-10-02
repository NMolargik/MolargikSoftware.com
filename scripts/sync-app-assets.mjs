#!/usr/bin/env node
// sync-app-assets.mjs
//
// Copies each app's latest icon and marketing screenshots from the Apps
// directory into src/assets/<app>/, resizing and re-encoding them for the web:
//
//   src/assets/<app>/icon.png          512px square PNG
//   src/assets/<app>/screens/NN.webp   max 1200px tall WebP, numbered in order
//
// Pages pick the screens up automatically via import.meta.glob, so adding or
// reordering screenshots is just a matter of re-running this script.
//
// Usage:
//   npm run assets                 sync every app in app-assets.config.mjs
//   npm run assets -- stork maestro   sync only those apps
//   APPS_DIR=/path/to/Apps npm run assets

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import apps, { APPS_DIR_DEFAULT } from './app-assets.config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APPS_DIR = path.resolve(ROOT, process.env.APPS_DIR ?? APPS_DIR_DEFAULT);
const ASSETS_DIR = path.join(ROOT, 'src', 'assets');

const ICON_SIZE = 512;
const SCREEN_MAX_HEIGHT = 1200; // 2x retina for the 384px-tall carousel
const WEBP_QUALITY = 82;
const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

const naturalCompare = new Intl.Collator('en', { numeric: true, sensitivity: 'base' }).compare;

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function listImages(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
  return entries
    .filter((e) => e.isFile() && IMAGE_EXT.test(e.name) && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort(naturalCompare);
}

async function syncIcon(app, source) {
  const src = path.join(APPS_DIR, source, app.icon);
  const out = path.join(ASSETS_DIR, app.app, 'icon.png');
  await fs.mkdir(path.dirname(out), { recursive: true });
  await sharp(src)
    .resize(ICON_SIZE, ICON_SIZE, { fit: 'cover' })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(out);
  const { size } = await fs.stat(out);
  console.log(`  icon   ${path.relative(ROOT, out)}  (${kb(size)})`);
}

async function syncScreens(app, source) {
  const outDir = path.join(ASSETS_DIR, app.app, 'screens');
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  let index = 0;
  let total = 0;
  for (const folder of app.screens) {
    const dir = path.join(APPS_DIR, source, folder);
    const files = await listImages(dir);
    if (files === null) {
      console.warn(`  ⚠️  missing folder: ${path.relative(APPS_DIR, dir)}`);
      continue;
    }
    for (const file of files) {
      index += 1;
      const out = path.join(outDir, `${String(index).padStart(2, '0')}.webp`);
      await sharp(path.join(dir, file))
        .resize({ height: SCREEN_MAX_HEIGHT, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(out);
      const { size } = await fs.stat(out);
      total += size;
      console.log(`  screen ${path.basename(out)}  ←  ${folder}/${file}  (${kb(size)})`);
    }
  }
  console.log(`  ${index} screenshots, ${kb(total)} total`);
}

async function main() {
  const requested = process.argv.slice(2).map((s) => s.toLowerCase());
  const selected = requested.length ? apps.filter((a) => requested.includes(a.app)) : apps;
  const unknown = requested.filter((r) => !apps.some((a) => a.app === r));
  if (unknown.length) {
    console.error(`Unknown app(s): ${unknown.join(', ')}. Known: ${apps.map((a) => a.app).join(', ')}`);
    process.exit(1);
  }

  console.log(`Apps directory: ${APPS_DIR}\n`);
  for (const app of selected) {
    console.log(`▶ ${app.app}`);
    const source = app.source;
    try {
      await fs.access(path.join(APPS_DIR, source));
    } catch {
      console.error(`  ❌ source folder not found: ${path.join(APPS_DIR, source)}`);
      process.exitCode = 1;
      continue;
    }
    await syncIcon(app, source);
    await syncScreens(app, source);
    console.log('');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
