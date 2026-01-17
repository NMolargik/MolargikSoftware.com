import { motion } from 'framer-motion';

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index?: number;
  accentColor?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  index = 0,
  accentColor = '#6E60FF'
}: FeatureCardProps) {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 shadow-inner transition-shadow duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-neutral-900"
      style={{
        // @ts-expect-error CSS custom property
        '--feature-accent': accentColor,
        focusWithinRingColor: accentColor
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 8px 30px -8px ${accentColor}40`,
        borderColor: `${accentColor}30`
      }}
      role="article"
      aria-label={`${title} feature`}
    >
      <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
        <span className="text-lg" aria-hidden="true">{icon}</span>
        <span>{title}</span>
      </h4>
      <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
        {description}
      </p>
    </motion.div>
  );
}
