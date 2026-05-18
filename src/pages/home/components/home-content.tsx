import type { JSX } from 'react';

import ErrorButton from '@/components/error-button';
import Loader from '@/components/loader/loader';
import SearchBar from '@/components/search-bar';
import CardList from '@/components/ui/card-list';
import type { CharacterSchema } from '@/types/interfaces';

interface HomeContentProps {
  isLoading: boolean;
  error: string | null;
  cards: CharacterSchema[];
  activeSearchQuery: string;
  isSidebarOpen: boolean;
  onSearch: (query: string) => void;
  onCardClick: (id: number, e: React.MouseEvent) => void;
}

export const HomeContent = ({
  isLoading,
  error,
  cards,
  activeSearchQuery,
  isSidebarOpen,
  onSearch,
  onCardClick,
}: HomeContentProps): JSX.Element => (
  <div className="pointer-events-none mx-auto my-0 flex w-full max-w-360 flex-col gap-6">
    <div className="pointer-events-auto self-start">
      <ErrorButton />
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
        <div className="pointer-events-auto">
          <CardList
            cards={cards}
            onCardClick={onCardClick}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      )}
    </div>
  </div>
);
