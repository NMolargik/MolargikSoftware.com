/**
 * Grid component for displaying palettes
 */

import type { OpalitePalette } from '../../types/opalite';
import PaletteCard from './PaletteCard';
import EmptyState from './EmptyState';

interface PaletteGridProps {
  palettes: OpalitePalette[];
}

export default function PaletteGrid({ palettes }: PaletteGridProps) {
  if (palettes.length === 0) {
    return <EmptyState type="palettes" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {palettes.map((palette) => (
        <PaletteCard key={palette.id} palette={palette} />
      ))}
    </div>
  );
}
