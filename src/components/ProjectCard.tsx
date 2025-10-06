import { Link } from 'react-router-dom';

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
export default function ProjectCard({ title, tagline, image, background, path }: ProjectCardProps) {
  return (
    <Link
      to={path}
      className="group relative block w-full overflow-hidden rounded-2xl shadow-lg border border-white/5 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple shrink-0 snap-start"
      style={{ aspectRatio: '9 / 10', minHeight: '500px', maxHeight: '650px' }}
      aria-label={`${title} — ${tagline}`}
    >
      {/* Fallback solid background */}
      <div className="absolute inset-0 bg-neutral-900" aria-hidden />
      {/* Background image */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background || image})` }}
        aria-hidden
      />
      {/* Dark gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-60" />
      <div className="absolute inset-x-0 bottom-0 px-4 py-2 text-xs text-white/70 sm:text-sm" aria-hidden />
      {/* Bottom overlay: text at left, image at right */}
      <div className="absolute inset-x-4 bottom-4 grid grid-cols-[1fr_auto] items-end gap-4">
        <div className="pointer-events-none max-w-full">
          <div className="inline-block rounded-xl bg-black/45 backdrop-blur px-4 py-3 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-black/55">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{title}</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-200">{tagline}</p>
          </div>
        </div>
        <img
          src={image}
          alt="Project preview"
          className="justify-self-end max-h-[28%] max-w-[32%] min-w-[96px] min-h-[72px] sm:min-w-[120px] sm:min-h-[90px] object-contain rounded-xl shadow-xl ring-1 ring-black/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-2xl bg-white p-1"
        />
      </div>
    </Link>
  );
}