/**
 * Opalite Web Color Detail - Detailed view for a single color
 */

import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { usePageMeta } from '../../hooks';
import { useCloudKitAuth } from '../../hooks/useCloudKitAuth';
import { useOpaliteColor } from '../../hooks/useOpaliteData';
import { colorToHex, getContrastColor } from '../../services/colorUtils';
import AuthGate from '../../components/opalite-web/AuthGate';
import ColorValues from '../../components/opalite-web/ColorValues';
import ColorHarmonies from '../../components/opalite-web/ColorHarmonies';
import ColorMetadata from '../../components/opalite-web/ColorMetadata';
import LoadingState from '../../components/opalite-web/LoadingState';
import ErrorState from '../../components/opalite-web/ErrorState';

const ACCENT_COLOR = '#9F95AF';

export default function OpaliteWebColorDetail() {
  const { id } = useParams<{ id: string }>();
  const { authState, signIn, checkAuth } = useCloudKitAuth();
  const { data: color, isLoading, error, refetch } = useOpaliteColor(id, authState.isAuthenticated);

  const colorName = color?.name || 'Untitled Color';
  const hex = color ? colorToHex(color) : '#000000';
  const textColor = color ? getContrastColor(hex) : 'white';

  usePageMeta({
    title: `${colorName} | Opalite Web`,
    description: `View details for ${colorName}`,
    accentColor: ACCENT_COLOR,
  });

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
        <div className="px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Back link */}
            <Link
              to="/opalite-web"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Portfolio
            </Link>

            <AuthGate authState={authState} onSignIn={signIn} onAuthChange={checkAuth}>
              {isLoading ? (
                <LoadingState type="detail" />
              ) : error ? (
                <ErrorState message={error} onRetry={refetch} />
              ) : color ? (
                <div className="space-y-6">
                  {/* Large color preview */}
                  <div
                    className="h-48 sm:h-64 rounded-3xl ring-1 ring-white/20 flex items-end p-6"
                    style={{ backgroundColor: hex }}
                  >
                    <div
                      className="space-y-1"
                      style={{ color: textColor }}
                    >
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        {colorName}
                      </h1>
                      <p className="font-mono opacity-80">
                        {hex.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Notes (if present) */}
                  {color.notes && (
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Notes</h3>
                      <p className="text-white/80 whitespace-pre-wrap">{color.notes}</p>
                    </div>
                  )}

                  {/* Content grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <ColorValues color={color} />
                      <ColorMetadata color={color} />
                    </div>
                    <div>
                      <ColorHarmonies color={color} />
                    </div>
                  </div>
                </div>
              ) : (
                <ErrorState message="Color not found" />
              )}
            </AuthGate>
          </div>
        </div>
      </section>
    </>
  );
}
