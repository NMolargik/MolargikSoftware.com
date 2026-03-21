import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import { useCloudKitAuth, usePortfolioData } from '../hooks/useCloudKit';
import { appColors } from '../theme/colors';
import ColorSwatch from '../components/ColorSwatch';
import ColorDetail from './ColorDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import { exportPortfolioPDF } from '../services/pdfExport';
import type { OpaliteColor } from '../types/opalite';

// Simple fade-in on mount — no scroll dependency
const appear = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export default function OpaliteWeb() {
  usePageMeta({
    title: 'Opalite Web — Your Color Portfolio',
    description: 'View your Opalite colors and palettes on the web.',
    accentColor: appColors.opalite.accent,
  });

  const auth = useCloudKitAuth();
  const { palettes, looseColors, isLoading, error, refresh, addColorByHex } = usePortfolioData(
    auth.isAuthenticated
  );

  const [selectedColor, setSelectedColor] = useState<OpaliteColor | null>(null);
  const [showHexInput, setShowHexInput] = useState(false);
  const [hexValue, setHexValue] = useState('');
  const [hexError, setHexError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const showSyncToast = () => {
    setToastKey((k) => k + 1);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

  const handleAddByHex = async () => {
    const clean = hexValue.replace(/^#/, '').trim();
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
      setHexError('Enter a valid 6-digit hex (e.g. FF5733)');
      return;
    }
    setHexError(null);
    setIsCreating(true);
    try {
      await addColorByHex(clean);
      setHexValue('');
      setShowHexInput(false);
      showSyncToast();
    } catch (err) {
      setHexError(err instanceof Error ? err.message : 'Failed to create color');
    } finally {
      setIsCreating(false);
    }
  };

  const totalColors =
    looseColors.length + palettes.reduce((sum, p) => sum + p.colors.length, 0);

  return (
    <section className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* CloudKit JS button containers — always in DOM, always off-screen */}
      <div
        id="apple-sign-in-button"
        style={{ position: 'fixed', left: -9999, top: 0 }}
      />
      <div
        id="apple-sign-out-button"
        style={{ position: 'fixed', left: -9999, top: 0 }}
      />

      {/* Header */}
      <motion.div {...appear} className="flex items-baseline justify-between mb-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Opalite
          </h1>
          <p className="mt-2 text-lg text-gray-500">Your color portfolio on the web</p>
          <p className="mt-2 text-lg text-gray-800">Changes take time to sync between devices</p>
        </div>
        {auth.isAuthenticated && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHexInput((v) => !v)}
              className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
              aria-label="Add color by hex"
              title="Add color by hex"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <button
              onClick={() => exportPortfolioPDF(palettes, looseColors)}
              className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
              aria-label="Export portfolio as PDF"
              title="Export portfolio as PDF"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </button>
            <button
              onClick={refresh}
              disabled={isLoading}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors disabled:opacity-50"
              aria-label="Refresh portfolio"
              title="Refresh"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
            </button>
            <button
              onClick={() => setShowSignOutConfirm(true)}
              className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-500 flex items-center justify-center transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        )}
      </motion.div>

      {/* Add by hex input */}
      <AnimatePresence>
        {showHexInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
              <span className="text-gray-400 font-mono text-sm">#</span>
              <input
                type="text"
                value={hexValue}
                onChange={(e) => {
                  setHexValue(e.target.value.replace(/^#/, '').replace(/[^0-9a-fA-F]/g, '').slice(0, 6).toUpperCase());
                  setHexError(null);
                }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddByHex(); if (e.key === 'Escape') setShowHexInput(false); }}
                placeholder="FF5733"
                maxLength={7}
                autoFocus
                className="flex-1 bg-transparent font-mono text-sm text-gray-900 placeholder-gray-300 outline-none"
              />
              {hexValue.length === 6 && (
                <div
                  className="w-8 h-8 rounded-lg border border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: `#${hexValue}` }}
                />
              )}
              <button
                onClick={handleAddByHex}
                disabled={isCreating}
                className="text-sm font-medium text-blue-500 hover:text-blue-700 disabled:opacity-50 transition-colors"
              >
                {isCreating ? 'Adding...' : 'Add'}
              </button>
              <button
                onClick={() => { setShowHexInput(false); setHexValue(''); setHexError(null); }}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
            {hexError && <p className="text-xs text-red-500 mt-1 ml-3">{hexError}</p>}
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Landing page */}
      {!auth.isLoading && !auth.isAuthenticated && !auth.error && (
        <motion.div {...appear} className="max-w-2xl mx-auto mt-8">
          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <svg className="w-8 h-8 mx-auto text-blue-500 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10a2.5 2.5 0 0 0 2.5-2.5c0-.61-.23-1.21-.64-1.67a.528.528 0 0 1-.13-.33c0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zM6.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              </svg>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">View Your Portfolio</h3>
              <p className="text-xs text-gray-500">Browse all your colors and palettes synced from the Opalite app.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <svg className="w-8 h-8 mx-auto text-purple-500 mb-3" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#A855F7"/>
                <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#3B82F6"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#F97316"/>
                <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#EF4444"/>
              </svg>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Browse Palettes</h3>
              <p className="text-xs text-gray-500">View all your palettes and the colors within them.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <svg className="w-8 h-8 mx-auto text-green-500 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.334a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Copy & Sample</h3>
              <p className="text-xs text-gray-500">Copy hex, RGB, and HSL values directly from your portfolio.</p>
            </div>
          </div>

          {/* Sign in card */}
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-10 text-center">
            <svg className="w-10 h-10 mx-auto text-gray-800 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Sign in with your Apple Account
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Your Opalite data is stored securely in iCloud. Sign in to access it here.
            </p>
            <button
              onClick={() => {
                const container = document.getElementById('apple-sign-in-button');
                const clickable = container?.querySelector<HTMLElement>('a, button, div[role="button"], span, div');
                clickable?.click();
              }}
              className="inline-flex items-center gap-2 bg-black text-white font-medium text-sm px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Sign in with Apple
            </button>
          </div>
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
              {/* Sync toast */}
              <AnimatePresence>
                {toastVisible && (
                  <motion.div
                    key={toastKey}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full text-center">
                      Changes may take time to sync to Apple devices...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loose colors */}
              {looseColors.length > 0 && (
                <motion.div {...appear}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10a2.5 2.5 0 0 0 2.5-2.5c0-.61-.23-1.21-.64-1.67a.528.528 0 0 1-.13-.33c0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zM6.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">Colors</h2>
                  </div>
                  <SwatchRow colors={looseColors} onColorClick={setSelectedColor} />
                </motion.div>
              )}

              {/* Palettes */}
              {palettes.length > 0 && (
                <div className="space-y-6">
                  <motion.div {...appear} className="flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="8" height="8" rx="2" fill="#A855F7"/>
                      <rect x="14" y="2" width="8" height="8" rx="2" fill="#3B82F6"/>
                      <rect x="2" y="14" width="8" height="8" rx="2" fill="#F97316"/>
                      <rect x="14" y="14" width="8" height="8" rx="2" fill="#EF4444"/>
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">Palettes</h2>
                  </motion.div>

                  {palettes.map((palette) => (
                    <motion.div key={palette.id} {...appear}>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{palette.name}</h3>
                        <span className="text-sm text-gray-400">
                          {palette.colors.length === 0
                            ? 'Empty palette'
                            : `${palette.colors.length} ${palette.colors.length === 1 ? 'color' : 'colors'}`}
                        </span>
                      </div>
                      {palette.colors.length > 0 ? (
                        <SwatchRow colors={palette.colors} onColorClick={setSelectedColor} />
                      ) : (
                        <p className="text-sm text-gray-400 italic pl-1">No colors yet</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {looseColors.length === 0 && palettes.length === 0 && (
                <motion.div
                  {...appear}
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

      {/* Color detail modal */}
      <AnimatePresence>
        {selectedColor && (
          <ColorDetail
            color={selectedColor}
            onClose={() => setSelectedColor(null)}
          />
        )}
      </AnimatePresence>

      {/* Sign out confirmation */}
      <AnimatePresence>
        {showSignOutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setShowSignOutConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign out?</h3>
              <p className="text-sm text-gray-500 mb-6">You'll need to sign in again to view your portfolio.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSignOutConfirm(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowSignOutConfirm(false);
                    const container = document.getElementById('apple-sign-out-button');
                    const clickable = container?.querySelector<HTMLElement>('a, button, div[role="button"], span, div');
                    if (clickable) {
                      clickable.click();
                    } else {
                      window.location.reload();
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-medium text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// ─── Sub-components ──────────────────────────────────────────────


function SwatchRow({ colors, onColorClick }: { colors: OpaliteColor[]; onColorClick?: (color: OpaliteColor) => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <motion.div
          key={color.id}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          layout
        >
          <ColorSwatch color={color} onClick={onColorClick} />
        </motion.div>
      ))}
    </div>
  );
}
