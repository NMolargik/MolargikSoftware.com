import { useState, useEffect, useCallback } from 'react';
import { signIn, onSignOut, onSignIn, fetchPortfolio, saveColorPaletteAssignment, createColorFromHex } from '../services/cloudkit';
import type { OpaliteColor, OpalitePalette } from '../types/opalite';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useCloudKitAuth() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const identity = await signIn();
        if (cancelled) return;

        setAuth({
          isAuthenticated: !!identity,
          isLoading: false,
          error: null,
        });

        onSignIn(() => {
          if (!cancelled) {
            setAuth({ isAuthenticated: true, isLoading: false, error: null });
          }
        });

        onSignOut(() => {
          if (!cancelled) {
            setAuth({ isAuthenticated: false, isLoading: false, error: null });
          }
        });
      } catch (err) {
        if (!cancelled) {
          setAuth({
            isAuthenticated: false,
            isLoading: false,
            error: err instanceof Error ? err.message : 'Failed to initialize CloudKit',
          });
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  return auth;
}

interface PortfolioData {
  palettes: OpalitePalette[];
  looseColors: OpaliteColor[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
  moveColor: (colorId: string, targetPaletteId: string | null) => boolean;
  addColorByHex: (hex: string) => Promise<void>;
}

export function usePortfolioData(isAuthenticated: boolean): PortfolioData {
  const [palettes, setPalettes] = useState<OpalitePalette[]>([]);
  const [looseColors, setLooseColors] = useState<OpaliteColor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPortfolio();
      setPalettes(data.palettes);
      setLooseColors(data.looseColors);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio data');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    load();
  }, [load]);

  /** Move a color to a palette (or loose). Optimistically updates UI, then syncs to CloudKit. */
  const moveColor = useCallback(
    (colorId: string, targetPaletteId: string | null) => {
      // Find the color in current state
      let movedColor: OpaliteColor | undefined;
      let sourcePaletteId: string | null = null;

      // Check loose colors
      const looseIdx = looseColors.findIndex((c) => c.id === colorId);
      if (looseIdx !== -1) {
        movedColor = looseColors[looseIdx];
        sourcePaletteId = null;
      }

      // Check palettes
      if (!movedColor) {
        for (const p of palettes) {
          const idx = p.colors.findIndex((c) => c.id === colorId);
          if (idx !== -1) {
            movedColor = p.colors[idx];
            sourcePaletteId = p.id;
            break;
          }
        }
      }

      if (!movedColor) return false;

      // Don't move if already in the target
      if (targetPaletteId === null && sourcePaletteId === null) return false;
      if (targetPaletteId !== null && sourcePaletteId === targetPaletteId) return false;

      const color = { ...movedColor, paletteId: targetPaletteId ?? undefined };

      // Optimistic UI update
      setPalettes((prev) =>
        prev.map((p) => {
          let colors = p.colors.filter((c) => c.id !== colorId);
          if (p.id === targetPaletteId) {
            colors = [color, ...colors];
          }
          return { ...p, colors };
        })
      );

      setLooseColors((prev) => {
        let next = prev.filter((c) => c.id !== colorId);
        if (targetPaletteId === null) {
          next = [color, ...next];
        }
        return next;
      });

      // Sync to CloudKit in the background
      saveColorPaletteAssignment(colorId, targetPaletteId).catch((err) => {
        console.error('[OpaliteWeb] Failed to save color assignment:', err);
        // Revert by reloading
        load();
      });

      return true;
    },
    [palettes, looseColors, load]
  );

  /** Create a new loose color from a hex value. */
  const addColorByHex = useCallback(
    async (hex: string) => {
      const color = await createColorFromHex(hex);
      setLooseColors((prev) => [color, ...prev]);
    },
    []
  );

  return { palettes, looseColors, isLoading, error, refresh: load, moveColor, addColorByHex };
}
