'use client';

import { useParams, useSearchParams } from 'next/navigation';

import { useRouter } from '@/i18n/routing';

export const useDetailsSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ id?: string }>();

  const detailsId = params?.id || null;
  const isSidebarOpen = Boolean(detailsId);

  const handleCloseDetails = () => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    const queryString = currentParams.toString();

    router.push(queryString ? `/?${queryString}` : '/');
  };

  const handleCardClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentParams = new URLSearchParams(searchParams?.toString());
    const queryString = currentParams.toString();

    router.push(
      queryString ? `/character/${id}?${queryString}` : `/character/${id}`
    );
  };

  return { isSidebarOpen, detailsId, handleCloseDetails, handleCardClick };
};
