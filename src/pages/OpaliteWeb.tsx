import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import { useCloudKitAuth, usePortfolioData } from '../hooks/useCloudKit';
import { appColors } from '../theme/colors';
import { fadeUp, staggerContainer, staggerChild } from '../utils/animations';
import ColorSwatch from '../components/ColorSwatch';
import LoadingSpinner from '../components/LoadingSpinner';
import type { OpalitePalette } from '../types/opalite';

export default function OpaliteWeb() {
  usePageMeta({
    title: 'Opalite Web — Your Color Portfolio',
    description: 'View your Opalite colors and palettes on the web.',
    accentColor: appColors.opalite.accent,
  });

  const auth = useCloudKitAuth();
  const { palettes, looseColors, isLoading, error, refresh } = usePortfolioData(
    auth.isAuthenticated
  );

  const totalColors =
    looseColors.length + palettes.reduce((sum, p) => sum + p.colors.length, 0);

  return (
    <section className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/*
       * CloudKit JS needs these containers in the DOM *before* setUpAuth runs.
       * Always mounted; hidden with zero dimensions when not active so CloudKit
       * injected content doesn't expand the element.
       */}
      <div
        id="apple-sign-in-button"
        style={auth.isAuthenticated || auth.isLoading ? { position: 'fixed', left: -9999, width: 0, height: 0, overflow: 'hidden' } : undefined}
      />
      <div
        id="apple-sign-out-button"
        style={{ position: 'fixed', left: -9999, width: 0, height: 0, overflow: 'hidden' }}
      />

      {/* Header */}
      <motion.div {...fadeUp} className="flex items-baseline justify-between mb-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Opalite
          </h1>
          <p className="mt-2 text-lg text-gray-500">Your color portfolio on the web</p>
        </div>
        {auth.isAuthenticated && (
          <button
            onClick={refresh}
            disabled={isLoading}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-50"
            aria-label="Refresh portfolio"
          >
            Refresh
          </button>
        )}
      </motion.div>

      {/* Auth loading */}
      {auth.isLoading && (
        <div className="relative h-40">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Auth error */}
      {auth.error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-red-700 font-medium">Failed to connect to iCloud</p>
          <p className="text-red-500 text-sm mt-1">{auth.error}</p>
        </div>
      )}

      {/* Sign in prompt */}
      {!auth.isLoading && !auth.isAuthenticated && !auth.error && (
        <motion.div
          {...fadeUp}
          className="rounded-2xl bg-gray-50 border border-gray-200 p-10 text-center max-w-lg mx-auto"
        >
          <div className="text-5xl mb-4">
            <svg className="w-12 h-12 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Sign in with Apple
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Sign in with your Apple Account to view your Opalite colors and palettes.
          </p>
        </motion.div>
      )}

      {/* Authenticated content */}
      {auth.isAuthenticated && (
        <>
          {/* Summary */}
          <p className="text-sm text-gray-400 mb-6">
            {totalColors} {totalColors === 1 ? 'color' : 'colors'} &middot;{' '}
            {palettes.length} {palettes.length === 1 ? 'palette' : 'palettes'}
          </p>

          {/* Loading data */}
          {isLoading && (
            <div className="relative h-40">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-center mb-8">
              <p className="text-red-700 font-medium">Error loading portfolio</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
              <button
                onClick={refresh}
                className="mt-3 text-sm font-medium text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Portfolio content */}
          {!isLoading && !error && (
            <div className="space-y-10">
              {/* Loose colors */}
              {looseColors.length > 0 && (
                <PaletteSection
                  title="Colors"
                  icon={
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10a2.5 2.5 0 0 0 2.5-2.5c0-.61-.23-1.21-.64-1.67a.528.528 0 0 1-.13-.33c0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zM6.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                  }
                >
                  <SwatchRow colors={looseColors} />
                </PaletteSection>
              )}

              {/* Palettes */}
              {palettes.length > 0 && (
                <div className="space-y-6">
                  <motion.div {...fadeUp} className="flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="8" height="8" rx="2" fill="#A855F7"/>
                      <rect x="14" y="2" width="8" height="8" rx="2" fill="#3B82F6"/>
                      <rect x="2" y="14" width="8" height="8" rx="2" fill="#F97316"/>
                      <rect x="14" y="14" width="8" height="8" rx="2" fill="#EF4444"/>
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">Palettes</h2>
                  </motion.div>

                  {palettes.map((palette) => (
                    <PaletteSection
                      key={palette.id}
                      title={palette.name}
                      subtitle={
                        palette.colors.length === 0
                          ? 'Empty palette'
                          : `${palette.colors.length} ${palette.colors.length === 1 ? 'color' : 'colors'}`
                      }
                    >
                      {palette.colors.length > 0 ? (
                        <SwatchRow colors={palette.colors} />
                      ) : (
                        <p className="text-sm text-gray-400 italic pl-1">No colors yet</p>
                      )}
                    </PaletteSection>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {looseColors.length === 0 && palettes.length === 0 && (
                <motion.div
                  {...fadeUp}
                  className="rounded-2xl bg-gray-50 border border-gray-200 p-10 text-center"
                >
                  <p className="text-gray-500 text-lg">Your portfolio is empty</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Create colors and palettes in the Opalite app to see them here.
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

function PaletteSection({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div {...fadeUp}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <span className="text-sm text-gray-400 self-baseline mt-0.5">{subtitle}</span>}
      </div>
      {children}
    </motion.div>
  );
}

const fastStagger: import('framer-motion').Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.02 } },
};

const fastChild: import('framer-motion').Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

function SwatchRow({ colors }: { colors: { id: string; red: number; green: number; blue: number; alpha: number; name?: string; notes?: string; createdAt: Date; updatedAt: Date }[] }) {
  return (
    <motion.div
      variants={fastStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="flex flex-wrap gap-3"
    >
      {colors.map((color) => (
        <motion.div key={color.id} variants={fastChild}>
          <ColorSwatch color={color as OpalitePalette['colors'][number]} />
        </motion.div>
      ))}
    </motion.div>
  );
}
