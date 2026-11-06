import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import LiquidGlass from './LiquidGlass';
import { fadeUp } from '../utils/animations';
import type { Testimonial } from '../data/apps';

interface TestimonialsProps {
  appName: string;
  items: Testimonial[];
  accentColor: string;
}

/** Short review quotes pulled from the App Store, shown above the download CTA. */
export default function Testimonials({ appName, items, accentColor }: TestimonialsProps) {
  if (items.length === 0) return null;
  return (
    <motion.section className="mt-16 px-4" aria-label={`What people say about ${appName}`} {...fadeUp}>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">
          From the App Store
        </h2>
        <div className={`grid gap-4 ${items.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'max-w-md mx-auto'}`}>
          {items.map((t) => (
            <LiquidGlass key={t.quote} variant="card" accentColor={accentColor} className="rounded-2xl p-6">
              <div className="flex gap-0.5 mb-3" aria-label="Five stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-current" style={{ color: accentColor }} aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-lg font-medium text-gray-900 leading-snug">“{t.quote}”</blockquote>
              <p className="mt-3 text-xs text-gray-500">{t.source}</p>
            </LiquidGlass>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
