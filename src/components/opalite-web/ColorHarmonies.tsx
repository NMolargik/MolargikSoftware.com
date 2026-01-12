/**
 * Color harmonies display component
 */

import { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import type { OpaliteColor, ColorHarmony } from '../../types/opalite';
import { calculateHarmonies, getContrastColor } from '../../services/colorUtils';

interface ColorHarmoniesProps {
  color: OpaliteColor;
}

function HarmonySection({ harmony }: { harmony: ColorHarmony }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (hex: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm text-white/60">{harmony.label}</h4>
      <div className="flex gap-2">
        {harmony.colors.map((hex, index) => {
          const textColor = getContrastColor(hex);
          return (
            <button
              key={index}
              onClick={() => handleCopy(hex, index)}
              className="group relative w-14 h-14 rounded-xl ring-1 ring-white/20 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9F95AF]"
              style={{ backgroundColor: hex }}
              title={`Click to copy ${hex}`}
            >
              <span
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono"
                style={{ color: textColor }}
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ColorHarmonies({ color }: ColorHarmoniesProps) {
  const [showInfo, setShowInfo] = useState(false);
  const harmonies = calculateHarmonies(color);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Color Harmonies</h3>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          title="What are color harmonies?"
        >
          <Info className="w-4 h-4 text-white/50" />
        </button>
      </div>

      {showInfo && (
        <p className="text-sm text-white/60 mb-4 bg-white/5 rounded-xl p-3">
          Color harmonies are combinations of colors based on their positions on the color wheel.
          They create visually pleasing palettes that work well together.
        </p>
      )}

      <div className="space-y-4">
        {harmonies.map((harmony) => (
          <HarmonySection key={harmony.type} harmony={harmony} />
        ))}
      </div>
    </div>
  );
}
