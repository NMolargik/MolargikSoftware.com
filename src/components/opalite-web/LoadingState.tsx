/**
 * Loading state component with skeleton cards
 */

interface LoadingStateProps {
  type: 'colors' | 'palettes' | 'detail';
  count?: number;
}

export default function LoadingState({ type, count = 6 }: LoadingStateProps) {
  if (type === 'detail') {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Large preview skeleton */}
        <div className="h-48 bg-white/10 rounded-3xl" />
        {/* Title skeleton */}
        <div className="h-8 w-48 bg-white/10 rounded-lg" />
        {/* Content skeletons */}
        <div className="space-y-4">
          <div className="h-24 bg-white/10 rounded-2xl" />
          <div className="h-32 bg-white/10 rounded-2xl" />
          <div className="h-20 bg-white/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse"
        >
          <div className="bg-white/10 backdrop-blur-xl ring-1 ring-white/15 rounded-2xl overflow-hidden">
            {/* Color/palette preview */}
            <div className={`${type === 'colors' ? 'aspect-square' : 'h-16'} bg-white/5`} />
            {/* Text area */}
            <div className="p-3 space-y-2">
              <div className="h-4 bg-white/10 rounded w-3/4" />
              <div className="h-3 bg-white/5 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
