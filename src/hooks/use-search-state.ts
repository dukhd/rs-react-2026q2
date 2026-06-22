'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import { usePathname, useRouter } from '@/i18n/routing';

import useLocalStorage from './use-local-storage';

export const useSearchState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);

  const currentPage = Number(searchParams?.get('page')) || 1;
  const urlSearchTerm = searchParams?.get('search');
  const [savedSearchTerm, setSearchTerm] = useLocalStorage(
    STORAGE_KEYS.SEARCH_TERM,
    ''
  );
  const activeSearchQuery = urlSearchTerm || savedSearchTerm;

  useEffect(() => {
    if (isInitialized.current) return;
    if (!urlSearchTerm && savedSearchTerm) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set('search', savedSearchTerm);
      params.set('page', String(currentPage));

      router.replace(`${pathname}?${params.toString()}`);
    }
    isInitialized.current = true;
  }, [
    urlSearchTerm,
    savedSearchTerm,
    currentPage,
    searchParams,
    pathname,
    router,
  ]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const params = new URLSearchParams();
    if (query) {
      params.set('search', query);
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', String(page));
    router.push(`/?${params.toString()}`);
  };

  return {
    currentPage,
    activeSearchQuery,
    handleSearch,
    handlePageChange,
    searchParams,
  };
};
