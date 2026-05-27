import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { STORAGE_KEYS } from '@/constants/storage-keys';

import useLocalStorage from './use-local-storage';

export const useSearchState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const urlSearchTerm = searchParams.get('search');
  const [savedSearchTerm, setSearchTerm] = useLocalStorage(
    STORAGE_KEYS.SEARCH_TERM,
    ''
  );
  const activeSearchQuery = urlSearchTerm || savedSearchTerm;

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

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setSearchParams((prev) => {
      if (query) {
        prev.set('search', query);
      } else {
        prev.delete('search');
      }
      prev.set('page', '1');
      prev.delete('details');
      return prev;
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(page));
      prev.delete('details');
      return prev;
    });
  };

  return {
    currentPage,
    activeSearchQuery,
    handleSearch,
    handlePageChange,
    searchParams,
  };
};
