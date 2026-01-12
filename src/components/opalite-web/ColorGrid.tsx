/**
 * Grid component for displaying colors
 */

import type { OpaliteColor } from '../../types/opalite';
import ColorCard from './ColorCard';
import EmptyState from './EmptyState';

interface ColorGridProps {
  colors: OpaliteColor[];
}

export default function ColorGrid({ colors }: ColorGridProps) {
  if (colors.length === 0) {
    return <EmptyState type="colors" />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {colors.map((color) => (
        <ColorCard key={color.id} color={color} />
      ))}
    </div>
  );
}
