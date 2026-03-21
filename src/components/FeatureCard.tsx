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
  accentColor = '#6D00FF',
}: FeatureCardProps) {
  return (
    <motion.div
      className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-gray-200 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -4 }}
      role="article"
      aria-label={`${title} feature`}
    >
      {/* Icon badge */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
        style={{ backgroundColor: `${accentColor}15` }}
        aria-hidden="true"
      >
        {icon}
      </div>

      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
    </motion.div>
  );
}
