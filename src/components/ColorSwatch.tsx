import { useState } from 'react';
import { motion } from 'framer-motion';
import type { OpaliteColor } from '../types/opalite';

interface ColorSwatchProps {
  color: OpaliteColor;
}

/** Convert 0-1 sRGB to hex string. */
function toHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v * 255)));
  return `#${[r, g, b].map((c) => clamp(c).toString(16).padStart(2, '0')).join('')}`;
}

/** WCAG relative luminance. */
function luminance(r: number, g: number, b: number): number {
  const linearize = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** Returns white or black for best contrast. */
function idealTextColor(r: number, g: number, b: number): string {
  return luminance(r, g, b) > 0.179 ? '#000000' : '#ffffff';
}

/** Darker shade of the color for the border (multiply by 0.65). */
function darkerHex(r: number, g: number, b: number): string {
  const factor = 0.65;
  return toHex(r * factor, g * factor, b * factor);
}

export default function ColorSwatch({ color }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);
  const hex = toHex(color.red, color.green, color.blue);
  const borderColor = darkerHex(color.red, color.green, color.blue);
  const textColor = idealTextColor(color.red, color.green, color.blue);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard not available
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="flex-shrink-0 flex flex-col items-center justify-end rounded-2xl cursor-pointer transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        backgroundColor: hex,
        border: `3px solid ${borderColor}`,
        width: 80,
        height: 80,
      }}
      title={`${color.name || hex} — click to copy`}
      aria-label={`Color ${color.name || hex}, click to copy hex code`}
    >
      <span
        className="text-[10px] font-semibold pb-1.5 select-none"
        style={{ color: textColor }}
      >
        {copied ? 'Copied!' : color.name || hex}
      </span>
    </motion.button>
  );
}
