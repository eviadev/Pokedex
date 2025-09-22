import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchPokemonCollection,
  fetchPokemonList,
  getInitialPokemonUrl,
} from '../api/pokemonApi';
import type { Pokemon } from '../types';

interface PokedexState {
  pokemon: Pokemon[];
  next: string | null;
  previous: string | null;
  total: number;
}

const initialState: PokedexState = {
  pokemon: [],
  next: null,
  previous: null,
  total: 0,
};

export interface UsePokedexResult extends PokedexState {
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  goToNext: () => void;
  goToPrevious: () => void;
}

export const usePokedex = (initialUrl: string = getInitialPokemonUrl()): UsePokedexResult => {
  const [state, setState] = useState<PokedexState>(initialState);
  const [currentUrl, setCurrentUrl] = useState<string>(initialUrl);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    setCurrentUrl(initialUrl);
  }, [initialUrl]);

  const loadPage = useCallback(
    async (url: string) => {
      if (!url) {
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      if (mountedRef.current) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const list = await fetchPokemonList({ url, signal: controller.signal });
        const pokemon = await fetchPokemonCollection({
          results: list.results,
          signal: controller.signal,
        });

        if (!mountedRef.current || controller.signal.aborted) {
          return;
        }

        setState({
          pokemon,
          next: list.next,
          previous: list.previous,
          total: list.count,
        });
      } catch (err) {
        const isAbortError =
          (err instanceof DOMException && err.name === 'AbortError') ||
          (err instanceof Error && err.name === 'AbortError');

        if (isAbortError || !mountedRef.current) {
          return;
        }

        const message = err instanceof Error ? err.message : 'Something went wrong while loading Pokémon data';
        setError(message);
      } finally {
        if (mountedRef.current && abortRef.current === controller) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    loadPage(currentUrl);
  }, [currentUrl, loadPage]);

  const refresh = useCallback(async () => {
    await loadPage(currentUrl);
  }, [currentUrl, loadPage]);

  const goToNext = useCallback(() => {
    if (state.next) {
      setCurrentUrl(state.next);
    }
  }, [state.next]);

  const goToPrevious = useCallback(() => {
    if (state.previous) {
      setCurrentUrl(state.previous);
    }
  }, [state.previous]);

  return {
    ...state,
    isLoading,
    error,
    refresh,
    goToNext,
    goToPrevious,
  };
};
