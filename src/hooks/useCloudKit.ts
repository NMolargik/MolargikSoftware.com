import { useState, useEffect, useCallback } from 'react';
import { signIn, onSignOut, onSignIn, fetchPortfolio } from '../services/cloudkit';
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

        // Listen for future auth changes
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

  return { palettes, looseColors, isLoading, error, refresh: load };
}
