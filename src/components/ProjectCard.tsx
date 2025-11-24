import { Link } from 'react-router-dom';
import { useState } from 'react';

export interface ProjectCardProps {
  title: string;
  tagline: string;
  image: string;
  background: string;
  path: string;
  fitMode?: 'cover' | 'contain';
}

/**
 * Project card that uses a large background image, places the existing image
 * in the bottom-right, and shows title + tagline in the bottom-left.
 */
export default function ProjectCard({ title, tagline, image, background, path, fitMode = 'cover' }: ProjectCardProps) {
  const bgFitClass = fitMode === 'contain' ? 'bg-contain' : 'bg-cover';
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Link
      to={path}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 motion-safe:transition-transform motion-safe:duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple shrink-0 snap-start"
      style={{ aspectRatio: '16 / 9' }}
      aria-label={`${title} — ${tagline}`}
    >
      {/* Fallback solid background */}
      <div className="absolute inset-0 bg-neutral-900" aria-hidden />
      {/* Background image */}
      <div
        className={`absolute inset-0 ${bgFitClass} bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(${background || image})` }}
        aria-hidden
      />
      {/* Dark gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
      {/* Bottom overlay: text at left, image at right */}
      <div className="absolute inset-x-4 bottom-4 grid grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] items-end gap-4">
        <div className="pointer-events-none max-w-none">
          <div className="block w-full rounded-xl bg-white/10 backdrop-blur-xl px-4 py-3 ring-1 ring-white/15 transition-all duration-300 group-hover:bg-white/12">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{title}</h3>
            <p className="mt-1 text-xs sm:text-sm text-white/90">{tagline}</p>
          </div>
        </div>
        <div className="justify-self-end aspect-square w-[24%] min-w-[96px] sm:min-w-[120px] rounded-[2rem] overflow-hidden transition duration-300 group-hover:-translate-y-0.5 bg-transparent">
          <div className="relative w-full h-full">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              </div>
            )}
            <img
              src={image}
              alt={`${title} icon`}
              width={120}
              height={120}
              loading="lazy"
              className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}