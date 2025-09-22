import type { ChangeEvent } from 'react';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';

interface AppHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isLoading: boolean;
  onRefresh: () => void;
}

export const AppHeader = ({ searchTerm, onSearchChange, isLoading, onRefresh }: AppHeaderProps) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <header className="border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">National</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">Pokédex</h1>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-4">
          <div className="relative w-full max-w-xs">
            <label className="sr-only" htmlFor="search">
              Search Pokémon
            </label>
            <input
              id="search"
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Pokémon"
              autoComplete="off"
              className="w-full rounded-full border border-slate-700 bg-slate-900/80 px-5 py-2 text-sm text-slate-100 shadow-inner placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <Button onClick={onRefresh} variant="secondary" disabled={isLoading}>
            <span className="flex items-center gap-2">
              {isLoading ? <Spinner size="sm" className="border-slate-500" /> : null}
              Refresh
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
