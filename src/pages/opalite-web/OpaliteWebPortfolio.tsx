/**
 * Opalite Web Portfolio - Main view for colors and palettes
 */

import { useState } from 'react';
import { LogOut, Droplet, Palette } from 'lucide-react';
import { usePageMeta } from '../../hooks';
import { useCloudKitAuth } from '../../hooks/useCloudKitAuth';
import { useOpaliteLooseColors, useOpalitePalettes } from '../../hooks/useOpaliteData';
import AuthGate from '../../components/opalite-web/AuthGate';
import ColorGrid from '../../components/opalite-web/ColorGrid';
import PaletteGrid from '../../components/opalite-web/PaletteGrid';
import LoadingState from '../../components/opalite-web/LoadingState';
import ErrorState from '../../components/opalite-web/ErrorState';
import opaliteIcon from '../../assets/opalite/opaliteicon.png';

const ACCENT_COLOR = '#9F95AF';

type Tab = 'colors' | 'palettes';

export default function OpaliteWebPortfolio() {
  const [activeTab, setActiveTab] = useState<Tab>('colors');
  const { authState, signIn, signOut, checkAuth } = useCloudKitAuth();

  const {
    data: colors,
    isLoading: colorsLoading,
    error: colorsError,
    refetch: refetchColors,
  } = useOpaliteLooseColors(authState.isAuthenticated);

  const {
    data: palettes,
    isLoading: palettesLoading,
    error: palettesError,
    refetch: refetchPalettes,
  } = useOpalitePalettes(authState.isAuthenticated);

  usePageMeta({
    title: 'Your Color Portfolio | Opalite Web',
    description: 'View your Opalite colors and palettes synced from iCloud.',
    accentColor: ACCENT_COLOR,
    preloadImage: opaliteIcon,
  });

  const isLoading = activeTab === 'colors' ? colorsLoading : palettesLoading;
  const error = activeTab === 'colors' ? colorsError : palettesError;
  const refetch = activeTab === 'colors' ? refetchColors : refetchPalettes;

  return (
    <>
      <style>{`
        :root { --accent: ${ACCENT_COLOR}; }
        header nav a:hover, nav a:hover, .nav-link:hover {
          color: var(--accent) !important;
        }
        header nav a:focus-visible, nav a:focus-visible, .nav-link:focus-visible {
          outline: 2px solid color-mix(in oklab, var(--accent), white 25%);
          outline-offset: 2px;
          border-radius: 6px;
        }
      `}</style>

      <section
        className="min-h-screen text-white"
        style={{ backgroundColor: 'rgb(36,36,36)' }}
      >
        {/* Header */}
        <div className="px-4 pt-8 pb-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={opaliteIcon}
                  alt="Opalite"
                  className="w-16 h-16 rounded-2xl"
                />
                <div>
                  <h1 className="text-2xl font-bold">Your Color Portfolio</h1>
                  <p className="text-white/60 text-sm">
                    Colors synced from Opalite via iCloud
                  </p>
                </div>
              </div>
              {authState.isAuthenticated && (
                <button
                  onClick={signOut}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-16">
          <div className="mx-auto max-w-6xl">
            <AuthGate authState={authState} onSignIn={signIn} onAuthChange={checkAuth}>
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('colors')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                    activeTab === 'colors'
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Droplet className="w-4 h-4" />
                  Loose Colors
                  {colors && (
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                      {colors.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('palettes')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                    activeTab === 'palettes'
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  Palettes
                  {palettes && (
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                      {palettes.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Content Area */}
              {isLoading ? (
                <LoadingState type={activeTab} />
              ) : error ? (
                <ErrorState message={error} onRetry={refetch} />
              ) : activeTab === 'colors' ? (
                <ColorGrid colors={colors || []} />
              ) : (
                <PaletteGrid palettes={palettes || []} />
              )}
            </AuthGate>
          </div>
        </div>
      </section>
    </>
  );
}
