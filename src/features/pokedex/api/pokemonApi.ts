import { fetchJson } from '../../../lib/apiClient';
import type { Pokemon, PokemonListResponse, PokemonListResult } from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const DEFAULT_LIMIT = 24;

export const buildPokemonListUrl = (limit: number = DEFAULT_LIMIT, offset: number = 0) =>
  `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;

export const getInitialPokemonUrl = (limit: number = DEFAULT_LIMIT) => buildPokemonListUrl(limit);

export async function fetchPokemonList({
  url,
  signal,
}: {
  url: string;
  signal?: AbortSignal;
}): Promise<PokemonListResponse> {
  return fetchJson<PokemonListResponse>(url, { signal });
}

export async function fetchPokemonByUrl({
  url,
  signal,
}: {
  url: string;
  signal?: AbortSignal;
}): Promise<Pokemon> {
  return fetchJson<Pokemon>(url, { signal });
}

export async function fetchPokemonCollection({
  results,
  signal,
}: {
  results: PokemonListResult[];
  signal?: AbortSignal;
}): Promise<Pokemon[]> {
  return Promise.all(
    results.map((result) =>
      fetchPokemonByUrl({
        url: result.url,
        signal,
      }),
    ),
  );
}
