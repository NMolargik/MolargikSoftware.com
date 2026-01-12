/**
 * Color card component for displaying a single color in a grid
 */

import { Link } from 'react-router-dom';
import type { OpaliteColor } from '../../types/opalite';
import { colorToHex, getContrastColor } from '../../services/colorUtils';

interface ColorCardProps {
  color: OpaliteColor;
}

export default function ColorCard({ color }: ColorCardProps) {
  const hex = colorToHex(color);
  const textColor = getContrastColor(hex);

  return (
    <Link
      to={`/opalite-web/color/${color.id}`}
      className="group block bg-white/10 backdrop-blur-xl ring-1 ring-white/15 rounded-2xl overflow-hidden transition-all duration-200 hover:ring-white/30 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9F95AF]"
    >
      {/* Color preview */}
      <div
        className="aspect-square relative"
        style={{ backgroundColor: hex }}
      >
        {/* Hex overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: textColor }}
        >
          <span className="text-sm font-mono font-medium px-2 py-1 rounded-lg bg-black/20 backdrop-blur-sm">
            {hex.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Info area */}
      <div className="p-3">
        <h3 className="text-white font-medium truncate">
          {color.name || 'Untitled Color'}
        </h3>
        <p className="text-white/50 text-sm font-mono">
          {hex.toUpperCase()}
        </p>
      </div>
    </Link>
  );
}
