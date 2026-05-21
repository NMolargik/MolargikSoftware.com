import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import { appColors } from '../theme/colors';
import type { OpaliteColor } from '../types/opalite';

// ─── Color math helpers ──────────────────────────────────────────

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function toHex(r: number, g: number, b: number): string {
  const toByte = (v: number) => {
    const n = Math.max(0, Math.min(255, Math.round(v * 255)));
    const h = n.toString(16).toUpperCase();
    return h.length < 2 ? '0' + h : h;
  };
  return `#${toByte(r)}${toByte(g)}${toByte(b)}`;
}

function toRgbString(r: number, g: number, b: number): string {
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  if (d === 0) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

function toHslString(r: number, g: number, b: number): string {
  const [h, s, l] = rgbToHsl(r, g, b);
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
}

function luminance(r: number, g: number, b: number): number {
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function idealTextColor(r: number, g: number, b: number): string {
  return luminance(r, g, b) > 0.179 ? '#000000' : '#ffffff';
}

function darkerHex(r: number, g: number, b: number): string {
  return toHex(r * 0.65, g * 0.65, b * 0.65);
}

// ─── Harmony calculations ────────────────────────────────────────

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r1: number, g1: number, b1: number;
  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  return [clamp01(r1 + m), clamp01(g1 + m), clamp01(b1 + m)];
}

type HarmonyType = 'complementary' | 'analogous' | 'triadic' | 'split-complementary' | 'tetradic';

function getHarmonyColors(r: number, g: number, b: number, type: HarmonyType): [number, number, number][] {
  const [h, s, l] = rgbToHsl(r, g, b);
  const sNorm = s / 100;
  const lNorm = l / 100;
  const rotate = (deg: number) => hslToRgb((h + deg + 360) % 360, sNorm, lNorm);

  switch (type) {
    case 'complementary':
      return [rotate(180)];
    case 'analogous':
      return [rotate(-30), rotate(30)];
    case 'triadic':
      return [rotate(120), rotate(240)];
    case 'split-complementary':
      return [rotate(150), rotate(210)];
    case 'tetradic':
      return [rotate(90), rotate(180), rotate(270)];
  }
}

const harmonyLabels: Record<HarmonyType, string> = {
  complementary: 'Complementary',
  analogous: 'Analogous',
  triadic: 'Triadic',
  'split-complementary': 'Split-Comp',
  tetradic: 'Tetradic',
};

const harmonyDescriptions: Record<HarmonyType, string> = {
  complementary: 'Colors opposite on the color wheel (180°). High contrast and visual tension.',
  analogous: 'Colors adjacent on the wheel (±30°). Harmonious and cohesive.',
  triadic: 'Three colors evenly spaced (120°). Strong contrast, balanced.',
  'split-complementary': 'Base color + two colors flanking its complement (150° & 210°). High contrast, less tension.',
  tetradic: 'Four colors at 90° intervals. Rich palette — one should dominate.',
};

// ─── Component ───────────────────────────────────────────────────

interface ColorDetailProps {
  color: OpaliteColor;
  onClose: () => void;
}

export default function ColorDetail({ color, onClose }: ColorDetailProps) {
  const { red, green, blue } = color;
  const hex = toHex(red, green, blue);
  const rgb = toRgbString(red, green, blue);
  const hsl = toHslString(red, green, blue);
  const textColor = idealTextColor(red, green, blue);

  const [harmonyType, setHarmonyType] = useState<HarmonyType>('complementary');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  usePageMeta({
    title: `${color.name || hex} — Opalite Web`,
    description: `Color detail for ${color.name || hex}`,
    accentColor: appColors.opalite.accent,
  });

  const harmonyColors = useMemo(
    () => getHarmonyColors(red, green, blue, harmonyType),
    [red, green, blue, harmonyType]
  );

  const copy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    } catch { /* */ }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const shortenDevice = (device?: string) => {
    if (!device) return 'Unknown';
    if (device.toLowerCase().includes('iphone')) return 'iPhone';
    if (device.toLowerCase().includes('ipad')) return 'iPad';
    if (device.toLowerCase().includes('mac')) return 'Mac';
    return device;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-10 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-[#0a0a0c] rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero swatch */}
        <div
          className="relative h-52 flex items-end justify-center pb-5"
          style={{ backgroundColor: hex }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
            style={{ color: textColor }}
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2
            className="text-2xl font-bold px-4 py-1.5 rounded-xl"
            style={{
              color: textColor,
              backgroundColor: `${textColor === '#000000' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)'}`,
            }}
          >
            {color.name || hex.toUpperCase()}
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Color values */}
          <div className="grid grid-cols-3 gap-3">
            <CopyTile label="HEX" value={hex} copied={copiedField === 'hex'} onCopy={() => copy(hex, 'hex')} />
            <CopyTile label="RGB" value={rgb} copied={copiedField === 'rgb'} onCopy={() => copy(rgb, 'rgb')} />
            <CopyTile label="HSL" value={hsl} copied={copiedField === 'hsl'} onCopy={() => copy(hsl, 'hsl')} />
          </div>

          {/* Download PNG */}
          <button
            onClick={() => {
              const canvas = document.createElement('canvas');
              canvas.width = 512;
              canvas.height = 512;
              const ctx = canvas.getContext('2d')!;
              ctx.fillStyle = hex;
              ctx.fillRect(0, 0, 512, 512);
              const link = document.createElement('a');
              link.download = `${color.name || hex.replace('#', '')}.png`;
              link.href = canvas.toDataURL('image/png');
              link.click();
            }}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-200 text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download PNG
          </button>

          {/* Info tiles */}
          <div className="grid grid-cols-3 gap-3">
            <InfoTile
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                </svg>
              }
              label="Created By"
              value={color.createdByDisplayName || 'Unknown'}
            />
            <InfoTile
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
                </svg>
              }
              label="Created On"
              value={shortenDevice(color.createdOnDeviceName)}
            />
            <InfoTile
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Updated"
              value={formatDate(color.updatedAt)}
            />
          </div>

          {/* Color Harmonies */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Color Harmonies</h3>

            {/* Harmony type selector */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(Object.keys(harmonyLabels) as HarmonyType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setHarmonyType(type)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                    harmonyType === type
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {harmonyLabels[type]}
                </button>
              ))}
            </div>

            {/* Description */}
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">{harmonyDescriptions[harmonyType]}</p>

            {/* Harmony swatches */}
            <div className="flex gap-2">
              {/* Base color */}
              <HarmonySwatch r={red} g={green} b={blue} label="Base" onCopy={copy} />
              {harmonyColors.map(([hr, hg, hb], i) => (
                <HarmonySwatch key={i} r={hr} g={hg} b={hb} onCopy={copy} />
              ))}
            </div>
          </div>

          {/* Notes */}
          {color.notes && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Notes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-[#0a0a0c] rounded-xl p-4 whitespace-pre-wrap">
                {color.notes}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

function CopyTile({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <button
      onClick={onCopy}
      className="bg-gray-50 dark:bg-[#0a0a0c] hover:bg-gray-100 rounded-xl p-3 text-left transition-colors group"
    >
      <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-mono font-medium text-gray-900 dark:text-white mt-0.5 truncate">
        {copied ? 'Copied!' : value}
      </p>
    </button>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0c] rounded-xl p-3">
      <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-1">
        {icon}
        <p className="text-[10px] font-semibold uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{value}</p>
    </div>
  );
}

function HarmonySwatch({
  r,
  g,
  b,
  label,
  onCopy,
}: {
  r: number;
  g: number;
  b: number;
  label?: string;
  onCopy: (text: string, field: string) => void;
}) {
  const hex = toHex(r, g, b);
  const border = darkerHex(r, g, b);
  const text = idealTextColor(r, g, b);
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        onCopy(hex, hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex-1 aspect-square rounded-2xl flex items-center justify-center transition-transform hover:scale-105"
      style={{ backgroundColor: hex, border: `2px solid ${border}`, minHeight: 56 }}
      title={`${label ? label + ': ' : ''}${hex} — click to copy`}
    >
      <span className="text-[9px] font-semibold select-none" style={{ color: text }}>
        {copied ? 'Copied!' : label || hex}
      </span>
    </button>
  );
}
