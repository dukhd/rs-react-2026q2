'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useDetailsSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSidebarOpen = pathname?.startsWith('/character/');

  const handleCloseDetails = () => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    router.push(`/?${currentParams.toString()}`);
  };

  const handleCardClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentParams = new URLSearchParams(searchParams?.toString());
    router.push(`/character/${id}?${currentParams.toString()}`);
  };

  return { isSidebarOpen, handleCloseDetails, handleCardClick };
};
