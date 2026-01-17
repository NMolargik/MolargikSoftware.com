import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

export interface ProjectCardProps {
  title: string;
  tagline: string;
  image: string;
  background: string;
  path: string;
  fitMode?: 'cover' | 'contain';
  index?: number;
}

const MotionLink = motion.create(Link);

/**
 * Project card that uses a large background image, places the existing image
 * in the bottom-right, and shows title + tagline in the bottom-left.
 */
export default function ProjectCard({ title, tagline, image, background, path, fitMode = 'cover', index = 0 }: ProjectCardProps) {
  const imgFitClass = fitMode === 'contain' ? 'object-contain' : 'object-cover';
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  return (
    <MotionLink
      to={path}
      data-snow-card="true"
      className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40 shrink-0 snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
      style={{ aspectRatio: '16 / 9' }}
      aria-label={`${title} — ${tagline}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      whileFocus={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      {/* Skeleton placeholder while background loads */}
      <div className={`absolute inset-0 bg-neutral-800 transition-opacity duration-500 ${bgLoaded ? 'opacity-0' : 'opacity-100'}`} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 animate-pulse" />
      </div>
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden
      >
        <img
          src={background || image}
          alt=""
          className={`w-full h-full ${imgFitClass}`}
          onLoad={() => setBgLoaded(true)}
          loading="lazy"
        />
      </div>
      {/* Dark gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
      {/* Bottom overlay: text at left, image at right */}
      <div className="absolute inset-x-4 bottom-4 grid grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] items-end gap-4 transition-opacity duration-300 group-hover:opacity-0">
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
    </MotionLink>
  );
}