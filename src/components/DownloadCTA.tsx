import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';

interface DownloadCTAProps {
  appName: string;
  appStoreUrl: string;
  accentColor?: string;
  preorder?: boolean;
}

export default function DownloadCTA({
  appName,
  appStoreUrl,
  accentColor = '#6D00FF',
  preorder = false,
}: DownloadCTAProps) {
  const actionText = preorder ? 'Preorder now' : 'Download now';
  const ariaLabel = preorder
    ? `Preorder ${appName} on the App Store`
    : `Download ${appName} on the App Store`;

  return (
    <motion.section
      className="mt-16 px-4"
      {...fadeUp}
      aria-label={preorder ? `Preorder ${appName}` : `Download ${appName}`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-gray-800 px-6 py-12 sm:px-10">
          {/* Accent line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px opacity-60"
            style={{
              background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
            }}
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Ready to try {appName}?
              </h2>
              <p className="mt-2 text-base sm:text-lg text-gray-500 dark:text-gray-400">
                {actionText} from the App Store.
              </p>
            </div>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-[200px] h-12 rounded-[8px] border border-black bg-white dark:bg-[#0a0a0c] hover:bg-gray-50 transition-colors flex-shrink-0 self-center sm:self-auto"
              aria-label={ariaLabel}
            >
              <svg className="w-7 h-7 text-gray-800 dark:text-gray-100 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="flex flex-col leading-none text-left">
                <span className="text-[9px] tracking-wide text-gray-800 dark:text-gray-100">{preorder ? 'Pre-Order on the' : 'Download on the'}</span>
                <span className="text-[18px] font-semibold text-gray-800 dark:text-gray-100 -mt-px tracking-tight">App Store</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
