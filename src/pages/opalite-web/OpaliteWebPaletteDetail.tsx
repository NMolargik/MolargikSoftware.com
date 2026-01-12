/**
 * Opalite Web Palette Detail - Detailed view for a single palette
 */

import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Tag } from 'lucide-react';
import { usePageMeta } from '../../hooks';
import { useCloudKitAuth } from '../../hooks/useCloudKitAuth';
import { useOpalitePalette } from '../../hooks/useOpaliteData';
import { colorToHex, formatDate } from '../../services/colorUtils';
import AuthGate from '../../components/opalite-web/AuthGate';
import ColorCard from '../../components/opalite-web/ColorCard';
import LoadingState from '../../components/opalite-web/LoadingState';
import ErrorState from '../../components/opalite-web/ErrorState';
import EmptyState from '../../components/opalite-web/EmptyState';

const ACCENT_COLOR = '#9F95AF';

export default function OpaliteWebPaletteDetail() {
  const { id } = useParams<{ id: string }>();
  const { authState, signIn, checkAuth } = useCloudKitAuth();
  const { data: palette, isLoading, error, refetch } = useOpalitePalette(id, authState.isAuthenticated);

  const paletteName = palette?.name || 'Untitled Palette';

  usePageMeta({
    title: `${paletteName} | Opalite Web`,
    description: `View the ${paletteName} palette`,
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
          <div className="mx-auto max-w-6xl">
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
              ) : palette ? (
                <div className="space-y-6">
                  {/* Palette header with color strip preview */}
                  <div className="rounded-3xl overflow-hidden ring-1 ring-white/20">
                    {/* Color strip */}
                    <div className="h-20 sm:h-28 flex">
                      {palette.colors.length > 0 ? (
                        palette.colors.slice(0, 8).map((color) => (
                          <div
                            key={color.id}
                            className="flex-1"
                            style={{ backgroundColor: colorToHex(color) }}
                          />
                        ))
                      ) : (
                        <div className="flex-1 bg-white/5 flex items-center justify-center">
                          <span className="text-white/40">No colors</span>
                        </div>
                      )}
                    </div>
                    {/* Palette info */}
                    <div className="bg-black/40 p-6">
                      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                        {paletteName}
                      </h1>
                      <p className="text-white/60">
                        {palette.colors.length} {palette.colors.length === 1 ? 'color' : 'colors'}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  {palette.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {palette.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/80"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {palette.notes && (
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Notes</h3>
                      <p className="text-white/80 whitespace-pre-wrap">{palette.notes}</p>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      {palette.createdByDisplayName && (
                        <div>
                          <span className="text-white/50 block">Created by</span>
                          <span className="text-white">{palette.createdByDisplayName}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-white/50 block">Created</span>
                        <span className="text-white">{formatDate(palette.createdAt)}</span>
                      </div>
                      <div>
                        <span className="text-white/50 block">Updated</span>
                        <span className="text-white">{formatDate(palette.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Colors grid */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Colors in this palette
                    </h3>
                    {palette.colors.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {palette.colors.map((color) => (
                          <ColorCard key={color.id} color={color} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState type="colors" />
                    )}
                  </div>
                </div>
              ) : (
                <ErrorState message="Palette not found" />
              )}
            </AuthGate>
          </div>
        </div>
      </section>
    </>
  );
}
