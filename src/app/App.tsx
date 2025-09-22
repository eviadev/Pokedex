import { useCallback, useMemo, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { PokemonGrid } from '../features/pokedex/components/PokemonGrid';
import { usePokedex } from '../features/pokedex/hooks/usePokedex';

const searchPredicate = (term: string) => {
  const normalized = term.trim().toLowerCase();

  if (!normalized) {
    return () => true;
  }

  return (value: string) => value.toLowerCase().includes(normalized);
};

const App = () => {
  const { pokemon, next, previous, total, isLoading, error, refresh, goToNext, goToPrevious } = usePokedex();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemon = useMemo(() => {
    const matchesSearch = searchPredicate(searchTerm);

    return pokemon.filter((entry) =>
      matchesSearch(entry.name) || entry.abilities.some(({ ability }) => matchesSearch(ability.name)),
    );
  }, [pokemon, searchTerm]);

  const trimmedSearchTerm = searchTerm.trim();

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleRefresh = useCallback(() => {
    void refresh();
  }, [refresh]);

  const hasNext = Boolean(next);
  const hasPrevious = Boolean(previous);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <AppHeader searchTerm={searchTerm} onSearchChange={handleSearchChange} isLoading={isLoading} onRefresh={handleRefresh} />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
        {error ? (
          <section className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-rose-600/40 bg-rose-950/40 p-12 text-center text-rose-200">
            <h2 className="text-2xl font-semibold">Unable to load Pokémon</h2>
            <p className="max-w-xl text-base text-rose-100/80">{error}</p>
            <Button onClick={handleRefresh} variant="secondary">
              Try Again
            </Button>
          </section>
        ) : (
          <>
            <section className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
              <p>
                Showing <span className="font-semibold text-slate-200">{filteredPokemon.length}</span> of{' '}
                <span className="font-semibold text-slate-200">{pokemon.length}</span> loaded Pokémon
                {trimmedSearchTerm ? (
                  <>
                    {' '}
                    matching "{trimmedSearchTerm}".
                  </>
                ) : (
                  '.'
                )}
              </p>
              <p>Total in Pokédex: {total}</p>
            </section>

            <section className="relative min-h-[200px]">
              <PokemonGrid
                pokemon={filteredPokemon}
                emptyMessage={trimmedSearchTerm ? `No Pokémon matched "${trimmedSearchTerm}". Try a different name or ability.` : "No Pokémon found. Try loading a different page."}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-slate-950/70">
                  <Spinner size="lg" className="border-slate-700" />
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="border-t border-slate-800/70 bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <span className="text-sm text-slate-400">
            {hasPrevious || hasNext ? 'Navigate the Pokédex' : 'You have reached the end of the Pokédex'}
          </span>
          <div className="flex gap-3">
            <Button variant="secondary" disabled={!hasPrevious || isLoading} onClick={goToPrevious}>
              Previous
            </Button>
            <Button variant="primary" disabled={!hasNext || isLoading} onClick={goToNext}>
              Next
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
