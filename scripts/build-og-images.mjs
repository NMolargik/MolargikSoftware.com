#!/usr/bin/env node
// build-og-images.mjs
//
// Renders a 1200x630 Open Graph image for every app (and a default one for
// the company) onto the brand gradient: public/og/<slug>.png, public/og/default.png.
// Icons come from ../../Apps/<App>/Icons/AppIcon.png (override with APPS_DIR),
// falling back to the bundled src/assets/<slug>/icon.png. Outputs are committed.
//
//   npm run og

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { apps } from '../src/data/catalog.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APPS_DIR = path.resolve(ROOT, process.env.APPS_DIR ?? '../../Apps');
const OUT_DIR = path.join(ROOT, 'public', 'og');

const W = 1200;
const H = 630;
const ICON = 340;
const ICON_X = 96;
const ICON_Y = Math.round((H - ICON) / 2);
const TEXT_X = ICON_X + ICON + 72;
const FONT = "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[.,;:]?$/, '…');
    return kept;
  }
  return lines;
}

function background({ accent }) {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6D00FF"/>
      <stop offset="1" stop-color="#FF6C00"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.28" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="#000" opacity="0.18"/>
</svg>`);
}

function textLayer({ title, lines, footer, titleSize, lineSize }) {
  const titleY = H / 2 - (lines.length * lineSize * 1.25) / 2 - 10;
  const body = lines
    .map(
      (l, i) =>
        `<text x="${TEXT_X}" y="${Math.round(titleY + 44 + (i + 1) * lineSize * 1.25)}" font-family="${FONT}" font-size="${lineSize}" fill="#fff" fill-opacity="0.92">${esc(l)}</text>`,
    )
    .join('\n');
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="${TEXT_X}" y="${Math.round(titleY)}" font-family="${FONT}" font-size="${titleSize}" font-weight="700" fill="#fff" letter-spacing="-1">${esc(title)}</text>
  ${body}
  <text x="${TEXT_X}" y="${H - 64}" font-family="${FONT}" font-size="26" font-weight="600" fill="#fff" fill-opacity="0.8" letter-spacing="1">${esc(footer)}</text>
</svg>`);
}

async function roundedIcon(file, size, radius) {
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
  );
  return sharp(file)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function iconFor(app) {
  const external = path.join(APPS_DIR, app.source, 'Icons', 'AppIcon.png');
  if (await exists(external)) return external;
  return path.join(ROOT, 'src', 'assets', app.slug, 'icon.png');
}

async function write(name, layers) {
  const out = path.join(OUT_DIR, `${name}.png`);
  await sharp(layers.background)
    .composite(layers.composite)
    .png({ compressionLevel: 9, palette: true, quality: 90, dither: 0.6 })
    .toFile(out);
  const { size } = await fs.stat(out);
  console.log(`  ${path.relative(ROOT, out)}  (${Math.round(size / 1024)} KB)`);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const app of apps) {
    const icon = await roundedIcon(await iconFor(app), ICON, 76);
    const shadow = await sharp({
      create: { width: ICON + 40, height: ICON + 40, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0.35 } },
    })
      .composite([
        {
          input: Buffer.from(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${ICON + 40}" height="${ICON + 40}"><rect x="20" y="20" width="${ICON}" height="${ICON}" rx="76" fill="#000"/></svg>`,
          ),
          blend: 'dest-in',
        },
      ])
      .blur(18)
      .png()
      .toBuffer();
    await write(app.slug, {
      background: background(app),
      composite: [
        { input: shadow, left: ICON_X - 20, top: ICON_Y - 8 },
        { input: icon, left: ICON_X, top: ICON_Y },
        {
          input: textLayer({
            title: app.name,
            lines: wrap(app.job, 34, 3),
            footer: 'molargiksoftware.com',
            titleSize: 84,
            lineSize: 34,
          }),
        },
      ],
    });
  }

  // Company default: the logo mark on the gradient.
  const logo = await sharp(path.join(ROOT, 'src', 'assets', 'logo.svg'), { density: 300 })
    .resize(ICON - 60, ICON - 60, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const plate = await sharp({
    create: { width: ICON, height: ICON, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${ICON}" height="${ICON}"><rect width="${ICON}" height="${ICON}" rx="76" fill="#fff"/></svg>`,
        ),
        blend: 'dest-in',
      },
      { input: logo, gravity: 'center' },
    ])
    .png()
    .toBuffer();
  await write('default', {
    background: background({ accent: '#FFFFFF' }),
    composite: [
      { input: plate, left: ICON_X, top: ICON_Y },
      {
        input: textLayer({
          title: 'Molargik Software',
          lines: wrap('Independent apps for every Apple device. Private by design.', 34, 3),
          footer: 'molargiksoftware.com',
          titleSize: 72,
          lineSize: 34,
        }),
      },
    ],
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
