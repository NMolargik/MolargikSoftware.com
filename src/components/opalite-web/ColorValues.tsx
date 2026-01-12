/**
 * Color values display component with copy functionality
 */

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { OpaliteColor } from '../../types/opalite';
import { colorToRepresentations } from '../../services/colorUtils';

interface ColorValuesProps {
  color: OpaliteColor;
}

interface ValueRowProps {
  label: string;
  value: string;
}

function ValueRow({ label, value }: ValueRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
      <span className="text-white/60 text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-white font-mono text-sm">{value}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-white/50" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function ColorValues({ color }: ColorValuesProps) {
  const representations = colorToRepresentations(color);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <h3 className="text-lg font-semibold text-white mb-3">Color Values</h3>
      <div>
        <ValueRow label="Hex" value={representations.hex.toUpperCase()} />
        <ValueRow
          label="RGB"
          value={`${representations.rgb.r}, ${representations.rgb.g}, ${representations.rgb.b}`}
        />
        <ValueRow
          label="HSL"
          value={`${Math.round(representations.hsl.h)}°, ${Math.round(representations.hsl.s)}%, ${Math.round(representations.hsl.l)}%`}
        />
        <ValueRow label="CSS RGB" value={representations.rgbString} />
        <ValueRow label="CSS RGBA" value={representations.rgbaString} />
        <ValueRow label="CSS HSL" value={representations.hslString} />
      </div>
    </div>
  );
}
