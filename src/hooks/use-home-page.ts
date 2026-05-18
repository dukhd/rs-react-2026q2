import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { CHARACTER_URL } from '@/constants/api-url';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { useFetch } from '@/hooks/use-fetch';
import useLocalStorage from '@/hooks/use-local-storage';
import { areAllCharacters } from '@/types/guards/are-all-characters.guard';

export const useHomePage = () => {
  const navigate = useNavigate();
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

  const selectedDetailsId = searchParams.get('details');
  const isSidebarOpen = !!selectedDetailsId;

  const urlToFetch = activeSearchQuery
    ? `${CHARACTER_URL}/?name=${encodeURIComponent(activeSearchQuery)}&page=${currentPage}`
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

  const handleCloseDetails = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete('details');
    navigate(`/?${currentParams.toString()}`);
  };

  const handleCardClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('details', String(id));
    navigate(`/?${currentParams.toString()}`);
  };

  return {
    currentPage,
    activeSearchQuery,
    isSidebarOpen,
    data,
    isLoading,
    error,
    totalPages,
    handleSearch,
    handlePageChange,
    handleCloseDetails,
    handleCardClick,
  };
};
