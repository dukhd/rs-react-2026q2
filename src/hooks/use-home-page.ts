import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import useLocalStorage from '@/hooks/use-local-storage';
import { useGetCharactersQuery } from '@/services/characters-api';

import { useCacheRefresh } from './use-cache-refresh';

export const useHomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { refreshPage } = useCacheRefresh();
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

  const selectedDetailsId = searchParams.get('details');
  const isSidebarOpen = !!selectedDetailsId;

  const { data, isLoading, isFetching, error } = useGetCharactersQuery({
    page: currentPage,
    searchTerm: activeSearchQuery,
  });
  const totalPages = data?.info?.pages ?? 1;

  const handleRefresh = () => {
    refreshPage(currentPage, activeSearchQuery);
  };

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
    isFetching,
    error,
    totalPages,
    handleSearch,
    handlePageChange,
    handleCloseDetails,
    handleCardClick,
    handleRefresh,
  };
};
