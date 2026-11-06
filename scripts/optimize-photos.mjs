#!/usr/bin/env node
// optimize-photos.mjs
//
// Re-encodes the portrait photos in src/assets to the size they are actually
// displayed at (a 160-182px circle, so 480px covers 3x displays) as WebP with
// a JPEG fallback. Pass source files to re-import originals:
//
//   npm run photos                       re-encode the current src/assets photos
//   npm run photos -- ~/Pictures/me.jpg  import a new headshot

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(ROOT, 'src', 'assets');
const SIZE = 480;

const photos = [
  { name: 'nickheadshot', source: process.argv[2] },
  { name: 'familyshot', source: process.argv[3] },
];

for (const { name, source } of photos) {
  const src = source ?? path.join(ASSETS, `${name}.jpg`);
  const input = await fs.readFile(src);
  const base = sharp(input).rotate().resize(SIZE, SIZE, { fit: 'cover', position: 'attention' });
  await base.clone().webp({ quality: 82 }).toFile(path.join(ASSETS, `${name}.webp`));
  await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(ASSETS, `${name}.jpg`));
  for (const ext of ['webp', 'jpg']) {
    const { size } = await fs.stat(path.join(ASSETS, `${name}.${ext}`));
    console.log(`  src/assets/${name}.${ext}  (${Math.round(size / 1024)} KB)`);
  }
}
