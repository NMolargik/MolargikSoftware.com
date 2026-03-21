import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface ProjectCardProps {
  title: string;
  tagline: string;
  image: string;
  background?: string;
  path: string;
  accentColor?: string;
  index?: number;
  ctaLabel?: string;
}

const MotionLink = motion.create(Link);

export default function ProjectCard({
  title,
  tagline,
  image,
  path,
  accentColor = '#6D00FF',
  index = 0,
  ctaLabel = 'Learn more',
}: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <MotionLink
      to={path}
      className="group block h-full rounded-3xl bg-white border border-gray-100 border-t-2 shadow-sm hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple focus-visible:ring-offset-2"
      style={{ borderTopColor: accentColor }}
      aria-label={`${title} — ${tagline}`}
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.3 } }}
    >
      <div className="p-6 flex flex-col h-full">
      {/* App icon */}
      <div className="mb-5">
        {!imageLoaded && (
          <div className="w-16 h-16 rounded-xl bg-gray-100 animate-pulse" />
        )}
        <img
          src={image}
          alt={`${title} icon`}
          width={64}
          height={64}
          className={`w-16 h-16 object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
      <p className="mt-2 text-gray-500 text-sm leading-relaxed">{tagline}</p>

      {/* Learn more */}
      <div
        className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200"
        style={{ color: accentColor }}
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
      </div>
    </MotionLink>
  );
}
