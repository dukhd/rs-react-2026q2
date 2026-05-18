import { type JSX, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router';

import ErrorButton from '@/components/error-button';
import Loader from '@/components/loader/loader';
import Pagination from '@/components/pagination/pagination';
import SearchBar from '@/components/search-bar';
import CardList from '@/components/ui/card-list';
import { CHARACTER_URL } from '@/constants/api-url';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { useFetch } from '@/hooks/use-fetch';
import useLocalStorage from '@/hooks/use-local-storage';
import { areAllCharacters } from '@/types/guards/are-all-characters.guard';

const HomePage = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const urlSearchTerm = searchParams.get('search');
  const savedSearchTerm = localStorage.getItem(STORAGE_KEYS.SEARCH_TERM) || '';
  const activeSearchQuery = urlSearchTerm || savedSearchTerm;
  const [, setSearchTerm] = useLocalStorage(
    STORAGE_KEYS.SEARCH_TERM,
    activeSearchQuery
  );

  useEffect(() => {
    if (!urlSearchTerm && savedSearchTerm) {
      setSearchParams(
        (prev) => {
          prev.set('search', savedSearchTerm);
          prev.set('page', String(currentPage));
          return prev;
        },
        { replace: true }
      );
    }
  }, [urlSearchTerm, savedSearchTerm, currentPage, setSearchParams]);

  const urlToFetch = activeSearchQuery
    ? `${CHARACTER_URL}/?name=${activeSearchQuery}&page=${currentPage}`
    : `${CHARACTER_URL}/?page=${currentPage}`;
  const { data, isLoading, error } = useFetch(urlToFetch, areAllCharacters);
  const totalPages = data?.info?.pages ?? 1;

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setSearchParams((prev) => {
      if (query) {
        prev.set('search', query);
      } else {
        prev.delete('search');
      }
      prev.set('page', '1');
      return prev;
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(page));
      return prev;
    });
  };

  return (
    <div className="flex">
      <section className="flex flex-1 flex-col items-center gap-2">
        <div className="self-start">
          <ErrorButton />
        </div>
        <div className="mx-auto my-0 flex max-w-360 flex-col gap-6">
          <SearchBar onSearch={handleSearch} initialValue={activeSearchQuery} />
          {isLoading && <Loader />}
          {error && (
            <div className="text-second mt-10 text-center text-2xl tracking-wide">
              <span>{error}</span>
            </div>
          )}
          {!isLoading && !error && <CardList cards={data?.results ?? []} />}
        </div>
        {!isLoading && !error && (
          <div className="bg-footer-bg shadow-footer fixed bottom-0 z-1000 w-full py-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>
      <aside>
        <Outlet />
      </aside>
    </div>
  );
};

export default HomePage;
