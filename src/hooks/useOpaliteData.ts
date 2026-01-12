/**
 * Data fetching hooks for Opalite Web
 */

import { useState, useEffect, useCallback } from 'react';
import type { OpaliteColor, OpalitePalette, DataFetchState } from '../types/opalite';
import {
  fetchColors as cloudKitFetchColors,
  fetchPalettes as cloudKitFetchPalettes,
  fetchColorById as cloudKitFetchColorById,
  fetchPaletteById as cloudKitFetchPaletteById,
} from '../services/cloudkit';

/**
 * Fetch all colors (loose colors - not in any palette)
 */
export function useOpaliteLooseColors(isAuthenticated: boolean): DataFetchState<OpaliteColor[]> & { refetch: () => void } {
  const [state, setState] = useState<DataFetchState<OpaliteColor[]>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const colors = await cloudKitFetchColors();
      // Filter to only loose colors (not in a palette)
      const looseColors = colors.filter((c) => !c.paletteId);
      // Sort by updatedAt (newest first)
      looseColors.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
      setState({ data: looseColors, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch colors',
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

/**
 * Fetch all palettes with their colors
 */
export function useOpalitePalettes(isAuthenticated: boolean): DataFetchState<OpalitePalette[]> & { refetch: () => void } {
  const [state, setState] = useState<DataFetchState<OpalitePalette[]>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const palettes = await cloudKitFetchPalettes();
      // Sort by createdAt (newest first)
      palettes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      // Sort colors within each palette by createdAt (newest first)
      palettes.forEach((p) => {
        p.colors.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      });
      setState({ data: palettes, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch palettes',
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

/**
 * Fetch a single color by ID
 */
export function useOpaliteColor(id: string | undefined, isAuthenticated: boolean): DataFetchState<OpaliteColor> & { refetch: () => void } {
  const [state, setState] = useState<DataFetchState<OpaliteColor>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!isAuthenticated || !id) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const color = await cloudKitFetchColorById(id);
      if (color) {
        setState({ data: color, isLoading: false, error: null });
      } else {
        setState({ data: null, isLoading: false, error: 'Color not found' });
      }
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch color',
      });
    }
  }, [id, isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

/**
 * Fetch a single palette by ID with its colors
 */
export function useOpalitePalette(id: string | undefined, isAuthenticated: boolean): DataFetchState<OpalitePalette> & { refetch: () => void } {
  const [state, setState] = useState<DataFetchState<OpalitePalette>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!isAuthenticated || !id) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const palette = await cloudKitFetchPaletteById(id);
      if (palette) {
        // Sort colors by createdAt (newest first)
        palette.colors.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setState({ data: palette, isLoading: false, error: null });
      } else {
        setState({ data: null, isLoading: false, error: 'Palette not found' });
      }
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch palette',
      });
    }
  }, [id, isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
