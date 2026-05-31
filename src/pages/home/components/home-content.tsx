import type { JSX } from 'react';

import ErrorButton from '@/components/error-button';
import Loader from '@/components/loader/loader';
import SearchBar from '@/components/search-bar';
import Button from '@/components/ui/button';

interface HomeContentProps {
  isLoading: boolean;
  error: string | null;
  activeSearchQuery: string;
  onSearch: (query: string) => void;
  onRefresh: () => void;
  cardList: React.ReactNode;
}

export const HomeContent = ({
  isLoading,
  error,
  activeSearchQuery,
  onSearch,
  onRefresh,
  cardList,
}: HomeContentProps): JSX.Element => (
  <div className="pointer-events-none mx-auto my-0 flex w-full max-w-360 flex-col gap-6">
    <div className="pointer-events-auto flex justify-between">
      <ErrorButton />
      <Button
        text="Refresh"
        type="button"
        onClick={onRefresh}
        customClassName={
          'bg-accent-yellow text-black px-4 py-2 text-xs sm:text-sm self-end'
        }
      />
    </div>

    <div className="pointer-events-auto mx-auto my-0 flex w-full max-w-360 flex-col gap-6">
      <SearchBar onSearch={onSearch} initialValue={activeSearchQuery} />

      {isLoading && <Loader />}

      {error && (
        <div className="text-second mt-10 text-center text-2xl tracking-wide">
          <span>{error}</span>
        </div>
      )}

      {!isLoading && !error && (
        <div className="pointer-events-auto">{cardList}</div>
      )}
    </div>
  </div>
);
