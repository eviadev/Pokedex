import type { Pokemon } from '../types';
import { PokemonCard } from './PokemonCard';

interface PokemonGridProps {
  pokemon: Pokemon[];
  emptyMessage?: string;
}

export const PokemonGrid = ({ pokemon, emptyMessage = 'No Pokémon found. Try loading a different page.' }: PokemonGridProps) => {
  if (!pokemon.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {pokemon.map((entry) => (
        <PokemonCard key={entry.id} pokemon={entry} />
      ))}
    </div>
  );
};

export default PokemonGrid;
