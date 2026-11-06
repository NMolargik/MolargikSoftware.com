import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';
import LiquidGlass from './LiquidGlass';
import AppStoreBadge from './AppStoreBadge';

interface DownloadCTAProps {
  appName: string;
  appStoreUrl: string;
  macAppStoreUrl?: string;
  price?: string;
  accentColor?: string;
  preorder?: boolean;
}

export default function DownloadCTA({
  appName,
  appStoreUrl,
  macAppStoreUrl,
  price,
  accentColor = '#6D00FF',
  preorder = false,
}: DownloadCTAProps) {
  const actionText = preorder ? 'Preorder now' : 'Download now';

  return (
    <motion.section
      className="mt-16 px-4"
      {...fadeUp}
      aria-label={preorder ? `Preorder ${appName}` : `Download ${appName}`}
    >
      <div className="mx-auto max-w-5xl">
        <LiquidGlass
          variant="card"
          accentColor={accentColor}
          className="relative overflow-hidden rounded-3xl px-6 py-12 sm:px-10"
        >
          {/* Accent line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px opacity-70"
            style={{
              background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
            }}
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Ready to try {appName}?
              </h2>
              <p className="mt-2 text-base sm:text-lg text-gray-600">
                {actionText} from the App Store.{price ? ` ${price}.` : ''}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 flex-shrink-0 self-center sm:self-auto">
              <AppStoreBadge href={appStoreUrl} appName={appName} preorder={preorder} />
              {macAppStoreUrl && <AppStoreBadge href={macAppStoreUrl} appName={appName} store="mac" />}
            </div>
          </div>
        </LiquidGlass>
      </div>
    </motion.section>
  );
}
