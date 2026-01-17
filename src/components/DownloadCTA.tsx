import { motion } from 'framer-motion';
import appStoreBadge from '../assets/appStore.svg';

interface DownloadCTAProps {
  appName: string;
  appStoreUrl: string;
  accentColor?: string;
  preorder?: boolean;
}

export default function DownloadCTA({
  appName,
  appStoreUrl,
  accentColor = '#6E60FF',
  preorder = false
}: DownloadCTAProps) {
  const actionText = preorder ? 'Preorder now' : 'Download now';
  const ariaLabel = preorder ? `Preorder ${appName} on the App Store` : `Download ${appName} on the App Store`;

  return (
    <motion.section
      className="mt-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      aria-label={preorder ? `Preorder ${appName}` : `Download ${appName}`}
    >
      <div className="mx-auto max-w-5xl">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 sm:px-10 shadow-[0_18px_45px_rgba(0,0,0,0.7)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-80"
            style={{
              background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`
            }}
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Ready to try {appName}?
              </h2>
              <p className="mt-2 text-base sm:text-lg text-white/80">
                {actionText} from the App Store.
              </p>
            </div>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 self-center sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded-lg"
              style={{
                // @ts-expect-error CSS custom property for focus ring
                '--tw-ring-color': accentColor
              }}
              aria-label={ariaLabel}
            >
              <img
                src={appStoreBadge}
                alt={preorder ? "Pre-Order on the App Store" : "Download on the App Store"}
                className="h-14 w-auto hover:opacity-90 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
