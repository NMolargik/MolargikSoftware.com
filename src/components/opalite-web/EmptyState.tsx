/**
 * Empty state component for when there's no data
 */

import { Palette, Droplet } from 'lucide-react';

interface EmptyStateProps {
  type: 'colors' | 'palettes' | 'all';
}

export default function EmptyState({ type }: EmptyStateProps) {
  const getMessage = () => {
    switch (type) {
      case 'colors':
        return {
          icon: <Droplet className="w-12 h-12 text-white/30" />,
          title: 'No loose colors yet',
          description: 'Colors not in a palette will appear here. Open Opalite on your device to create some.',
        };
      case 'palettes':
        return {
          icon: <Palette className="w-12 h-12 text-white/30" />,
          title: 'No palettes yet',
          description: 'Your color palettes will appear here. Open Opalite on your device to create some.',
        };
      case 'all':
        return {
          icon: <Palette className="w-12 h-12 text-white/30" />,
          title: 'No colors or palettes yet',
          description: 'Your Opalite colors and palettes will appear here once you create them in the app.',
        };
    }
  };

  const { icon, title, description } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/60 max-w-md">{description}</p>
    </div>
  );
}
