'use client';

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useLocale } from 'next-intl';

export const useDetailsSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ id?: string }>();
  const pathname = usePathname();
  const locale = useLocale();

  const detailsId = params?.id || null;

  const isSidebarOpen = pathname.includes('/character/');

  const handleCloseDetails = () => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    const queryString = currentParams.toString();
    const targetUrl = queryString ? `/${locale}?${queryString}` : `/${locale}`;

    router.replace(targetUrl);
  };

  const handleRefresh = () => {
    router.refresh();
  };

  return { isSidebarOpen, detailsId, handleCloseDetails, handleRefresh };
};
