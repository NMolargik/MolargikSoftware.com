import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import type { Promo } from '../data/apps';
import { usePromoActive } from '../hooks/usePromoActive';
import { trackLiquidGlassCursor } from '../utils/liquidGlass';

interface PriceLineProps {
  price: string;
  detail?: string;
  platforms: string[];
  promo?: Promo;
  accentColor: string;
}

/**
 * The price and platform line that sits directly under an app hero, plus a
 * date-driven promo banner (rendered only while the promo window is open).
 */
export default function PriceLine({ price, detail, platforms, promo, accentColor }: PriceLineProps) {
  const promoLive = usePromoActive(promo);
  return (
    <motion.div
      className="max-w-3xl mx-auto px-6 -mt-6 pb-10 text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {promoLive && promo && (
        <div
          role="status"
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md"
          style={{ background: `linear-gradient(90deg, ${accentColor}, #6D00FF)` }}
        >
          <Tag size={16} aria-hidden="true" />
          {promo.label}
        </div>
      )}
      <p className="text-lg font-semibold text-gray-900">
        <span className="sr-only">Price: </span>
        {price}
      </p>
      {detail && <p className="mt-1 text-sm text-gray-500 max-w-xl mx-auto">{detail}</p>}
      <ul className="mt-4 flex flex-wrap justify-center gap-2 list-none p-0" aria-label="Available on">
        {platforms.map((platform) => (
          <li
            key={platform}
            onMouseMove={trackLiquidGlassCursor}
            className="liquid-glass liquid-glass-pill inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-gray-700"
          >
            {platform}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
