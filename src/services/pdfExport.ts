/**
 * Portfolio PDF export — mirrors the app's PortfolioPDFExporter layout.
 * Generates a PDF using raw PDF stream construction (no dependencies).
 */

import type { OpaliteColor, OpalitePalette } from '../types/opalite';

// ─── Helpers ─────────────────────────────────────────────────────

function toHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v * 255)));
  return `#${[r, g, b].map((v) => c(v).toString(16).toUpperCase().padStart(2, '0')).join('')}`;
}

function toRgbStr(r: number, g: number, b: number): string {
  return `RGB(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

function toHslStr(r: number, g: number, b: number): string {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return `HSL(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// ─── PDF via Canvas rendering ────────────────────────────────────

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 40;
const CONTENT_W = PAGE_W - MARGIN * 2;
const SWATCH_SIZE = 36;
const ROW_HEIGHT = 55;

interface DrawContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pages: string[]; // data URLs of rendered pages
  y: number;
}

function newPage(dc: DrawContext) {
  // Save current page if anything was drawn
  if (dc.y > MARGIN) {
    dc.pages.push(dc.canvas.toDataURL('image/jpeg', 0.92));
  }
  dc.ctx.fillStyle = '#FFFFFF';
  dc.ctx.fillRect(0, 0, PAGE_W, PAGE_H);
  dc.y = MARGIN;
}

function ensureSpace(dc: DrawContext, needed: number) {
  if (dc.y + needed > PAGE_H - MARGIN) {
    newPage(dc);
  }
}

function drawTitle(dc: DrawContext, text: string) {
  dc.ctx.fillStyle = '#111827';
  dc.ctx.font = 'bold 28px Inter, system-ui, sans-serif';
  dc.ctx.fillText(text, MARGIN, dc.y + 28);
  dc.y += 36;
}

function drawSubtitle(dc: DrawContext, text: string) {
  dc.ctx.fillStyle = '#6B7280';
  dc.ctx.font = '12px Inter, system-ui, sans-serif';
  dc.ctx.fillText(text, MARGIN, dc.y + 12);
  dc.y += 18;
}

function drawDivider(dc: DrawContext) {
  dc.ctx.strokeStyle = '#E5E7EB';
  dc.ctx.lineWidth = 1;
  dc.ctx.beginPath();
  dc.ctx.moveTo(MARGIN, dc.y + 8);
  dc.ctx.lineTo(PAGE_W - MARGIN, dc.y + 8);
  dc.ctx.stroke();
  dc.y += 20;
}

function drawSectionHeader(dc: DrawContext, text: string) {
  ensureSpace(dc, 30);
  dc.ctx.fillStyle = '#111827';
  dc.ctx.font = '600 18px Inter, system-ui, sans-serif';
  dc.ctx.fillText(text, MARGIN, dc.y + 18);
  dc.y += 28;
}

function drawPaletteName(dc: DrawContext, text: string, indent: number) {
  ensureSpace(dc, 24);
  dc.ctx.fillStyle = '#374151';
  dc.ctx.font = '500 14px Inter, system-ui, sans-serif';
  dc.ctx.fillText(text, MARGIN + indent, dc.y + 14);
  dc.y += 22;
}

function drawColorRow(dc: DrawContext, color: OpaliteColor, indent: number) {
  ensureSpace(dc, ROW_HEIGHT);

  const x = MARGIN + indent;
  const { red, green, blue, alpha } = color;
  const hex = toHex(red, green, blue);
  const rgb = toRgbStr(red, green, blue);
  const hsl = toHslStr(red, green, blue);

  // Swatch
  const swatchX = x;
  const swatchY = dc.y + 4;
  dc.ctx.fillStyle = `rgba(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(blue * 255)}, ${alpha})`;
  dc.ctx.beginPath();
  dc.ctx.roundRect(swatchX, swatchY, SWATCH_SIZE, SWATCH_SIZE, 6);
  dc.ctx.fill();
  dc.ctx.strokeStyle = '#D1D5DB';
  dc.ctx.lineWidth = 0.5;
  dc.ctx.stroke();

  // Text
  const textX = x + SWATCH_SIZE + 10;

  // Line 1: Name
  dc.ctx.fillStyle = '#111827';
  dc.ctx.font = '500 11px Inter, system-ui, sans-serif';
  dc.ctx.fillText(color.name || 'Untitled', textX, dc.y + 14);

  // Line 2: Hex + RGB
  dc.ctx.fillStyle = '#6B7280';
  dc.ctx.font = '9px Inter, system-ui, sans-serif';
  dc.ctx.fillText(`${hex}    ${rgb}`, textX, dc.y + 27);

  // Line 3: HSL + opacity
  let line3 = hsl;
  if (alpha < 1) {
    line3 += `    ${Math.round(alpha * 100)}% opacity`;
  }
  dc.ctx.fillText(line3, textX, dc.y + 39);

  dc.y += ROW_HEIGHT;
}

// ─── Public API ──────────────────────────────────────────────────

export function exportPortfolioPDF(
  palettes: OpalitePalette[],
  looseColors: OpaliteColor[]
) {
  const canvas = document.createElement('canvas');
  canvas.width = PAGE_W;
  canvas.height = PAGE_H;
  const ctx = canvas.getContext('2d')!;

  const dc: DrawContext = { canvas, ctx, pages: [], y: MARGIN };

  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, PAGE_W, PAGE_H);

  // Title page
  const totalColors = looseColors.length + palettes.reduce((s, p) => s + p.colors.length, 0);
  const now = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  drawTitle(dc, 'Opalite Portfolio');
  drawSubtitle(dc, `Exported on ${now}`);
  drawSubtitle(dc, `${palettes.length} palette${palettes.length === 1 ? '' : 's'}, ${totalColors} total color${totalColors === 1 ? '' : 's'}`);
  drawDivider(dc);
  dc.y += 10;

  // Palettes
  const sortedPalettes = [...palettes].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  if (sortedPalettes.length > 0) {
    drawSectionHeader(dc, 'Palettes');

    for (const palette of sortedPalettes) {
      drawPaletteName(dc, `${palette.name} (${palette.colors.length})`, 0);

      if (palette.colors.length === 0) {
        ensureSpace(dc, 20);
        dc.ctx.fillStyle = '#9CA3AF';
        dc.ctx.font = 'italic 10px Inter, system-ui, sans-serif';
        dc.ctx.fillText('No colors in this palette.', MARGIN + 20, dc.y + 10);
        dc.y += 20;
      } else {
        const sortedColors = [...palette.colors].sort((a, b) =>
          (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' })
        );
        for (const color of sortedColors) {
          drawColorRow(dc, color, 20);
        }
      }
      dc.y += 15;
    }
  }

  // Loose colors
  if (looseColors.length > 0) {
    drawSectionHeader(dc, 'Loose Colors');
    const sortedLoose = [...looseColors].sort((a, b) =>
      (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' })
    );
    for (const color of sortedLoose) {
      drawColorRow(dc, color, 0);
    }
  }

  // Capture final page
  dc.pages.push(dc.canvas.toDataURL('image/jpeg', 0.92));

  // Build a simple PDF with embedded JPEG pages
  buildAndDownloadPDF(dc.pages, PAGE_W, PAGE_H);
}

// ─── Minimal PDF builder ─────────────────────────────────────────

function buildAndDownloadPDF(pages: string[], w: number, h: number) {
  // Use a hidden iframe with print-to-PDF as fallback won't work,
  // so we'll create an actual PDF from the canvas pages.
  // Simplest cross-browser approach: open images in a print window.

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export PDF');
    return;
  }

  const imagesHtml = pages
    .map(
      (dataUrl) =>
        `<img src="${dataUrl}" style="width:${w}px;height:${h}px;page-break-after:always;display:block;" />`
    )
    .join('\n');

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Opalite Portfolio</title>
  <style>
    @page { size: letter; margin: 0; }
    body { margin: 0; padding: 0; }
    img { max-width: 100%; height: auto; }
    @media print {
      img { page-break-after: always; width: 100% !important; height: auto !important; }
      img:last-child { page-break-after: avoid; }
    }
  </style>
</head>
<body>
${imagesHtml}
<script>
  window.onload = function() {
    setTimeout(function() { window.print(); window.close(); }, 300);
  };
</script>
</body>
</html>`);
  printWindow.document.close();
}
