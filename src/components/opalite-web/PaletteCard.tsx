/**
 * Palette card component for displaying a palette in a grid
 */

import { Link } from 'react-router-dom';
import type { OpalitePalette } from '../../types/opalite';
import { colorToHex } from '../../services/colorUtils';

interface PaletteCardProps {
  palette: OpalitePalette;
}

export default function PaletteCard({ palette }: PaletteCardProps) {
  // Get first 5 colors for preview strip
  const previewColors = palette.colors.slice(0, 5);
  const hasMoreColors = palette.colors.length > 5;

  return (
    <Link
      to={`/opalite-web/palette/${palette.id}`}
      className="group block bg-white/10 backdrop-blur-xl ring-1 ring-white/15 rounded-2xl overflow-hidden transition-all duration-200 hover:ring-white/30 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9F95AF]"
    >
      {/* Color strip preview */}
      <div className="h-16 flex">
        {previewColors.length > 0 ? (
          <>
            {previewColors.map((color) => (
              <div
                key={color.id}
                className="flex-1"
                style={{ backgroundColor: colorToHex(color) }}
              />
            ))}
            {hasMoreColors && (
              <div className="flex-1 bg-white/10 flex items-center justify-center">
                <span className="text-white/60 text-xs font-medium">
                  +{palette.colors.length - 5}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 bg-white/5 flex items-center justify-center">
            <span className="text-white/40 text-sm">No colors</span>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="p-3">
        <h3 className="text-white font-medium truncate">
          {palette.name || 'Untitled Palette'}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-white/50 text-sm">
            {palette.colors.length} {palette.colors.length === 1 ? 'color' : 'colors'}
          </span>
          {palette.tags.length > 0 && (
            <>
              <span className="text-white/30">·</span>
              <span className="text-white/50 text-sm truncate">
                {palette.tags.slice(0, 2).join(', ')}
                {palette.tags.length > 2 && ` +${palette.tags.length - 2}`}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
