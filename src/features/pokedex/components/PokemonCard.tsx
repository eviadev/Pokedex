import type { Pokemon, PokemonTypeName } from '../types';
import { typeColors } from '../types/typeColors';
import { formatHeight, formatName, formatWeight } from '../utils/formatPokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const TypeBadge = ({ typeName }: { typeName: string }) => {
  const normalizedType = (typeName.toLowerCase() || 'unknown') as PokemonTypeName;
  const backgroundColor = typeColors[normalizedType] ?? typeColors.unknown;

  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
      style={{ backgroundColor }}
    >
      {typeName}
    </span>
  );
};

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const primaryType = (pokemon.types[0]?.type.name ?? 'unknown') as PokemonTypeName;
  const accentColor = typeColors[primaryType] ?? typeColors.unknown;
  const spriteUrl = pokemon.sprites.front_default;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/80 backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:border-slate-700"
      style={{
        boxShadow: `0 20px 45px -25px ${accentColor}`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70 blur-2xl transition-opacity group-hover:opacity-90"
        style={{
          background: `radial-gradient(circle at top, ${accentColor} 0%, transparent 65%)`,
        }}
      />

      <div className="relative flex flex-1 flex-col gap-6 p-6">
        <header className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">#{pokemon.id.toString().padStart(4, '0')}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-50">
              {formatName(pokemon.name)}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} typeName={type.name} />
            ))}
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center">
          {spriteUrl ? (
            <img
              src={spriteUrl}
              alt={formatName(pokemon.name)}
              className="h-32 w-32 drop-shadow-[0_12px_24px_rgba(15,23,42,0.8)] transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-800 text-sm text-slate-400">
              No Image
            </div>
          )}
        </div>

        <dl className="grid grid-cols-3 gap-4 text-sm">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-3 text-center">
            <dt className="text-xs uppercase tracking-wide text-slate-400">Height</dt>
            <dd className="mt-1 text-base font-semibold text-slate-50">{formatHeight(pokemon.height)}</dd>
          </div>
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-3 text-center">
            <dt className="text-xs uppercase tracking-wide text-slate-400">Weight</dt>
            <dd className="mt-1 text-base font-semibold text-slate-50">{formatWeight(pokemon.weight)}</dd>
          </div>
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-3 text-center">
            <dt className="text-xs uppercase tracking-wide text-slate-400">Ability</dt>
            <dd className="mt-1 text-base font-semibold text-slate-50">
              {pokemon.abilities[0]?.ability.name ? formatName(pokemon.abilities[0].ability.name) : 'Unknown'}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
};

export default PokemonCard;
