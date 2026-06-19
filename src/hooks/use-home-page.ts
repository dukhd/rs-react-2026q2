'use client';

import { useGetCharactersQuery } from '@/services/characters-api';

import { useCacheRefresh } from './use-cache-refresh';
import { useDetailsSidebar } from './use-details-sidebar';
import { useSearchState } from './use-search-state';

export const useHomePage = () => {
  const { currentPage, activeSearchQuery, handleSearch, handlePageChange } =
    useSearchState();
  const { isSidebarOpen, handleCloseDetails, handleCardClick } =
    useDetailsSidebar();
  const { refreshPage } = useCacheRefresh();

  const { data, isLoading, isFetching, error } = useGetCharactersQuery({
    page: currentPage,
    searchTerm: activeSearchQuery,
  });
  const totalPages = data?.info?.pages ?? 1;

  const handleRefresh = () => {
    refreshPage(currentPage, activeSearchQuery);
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
