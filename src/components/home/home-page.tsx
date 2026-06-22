'use client';

import { useTranslations } from 'next-intl';
import { type JSX } from 'react';

import Flyout from '@/components/flyout';
import { HomeContent } from '@/components/home/home-content';
import Pagination from '@/components/pagination/pagination';
import CardList from '@/components/ui/card-list';
import { useAppSelector } from '@/hooks/store-hooks';
import { useDetailsSidebar } from '@/hooks/use-details-sidebar';
import { useSearchState } from '@/hooks/use-search-state';
import { AllCharactersSchema } from '@/types/interfaces';
import { formatErrorMessage } from '@/utils/error-formatter';

interface HomePageProps {
  serverData: AllCharactersSchema | null;
  serverError: unknown;
  initialQuery: string;
  initialPage: number;
  onSearch: (formData: FormData) => Promise<void>;
}

const HomePage = ({
  serverData,
  serverError,
  initialQuery,
  initialPage,
  onSearch,
}: HomePageProps): JSX.Element => {
  const t = useTranslations('HomePage');
  const tErrors = useTranslations('Errors');

  const { isSidebarOpen, handleCloseDetails, handleRefresh } =
    useDetailsSidebar();
  const { handlePageChange } = useSearchState();

  const selectedCards = useAppSelector((state) => state.selectedCards.cards);
  const hasSelectedCards = selectedCards.length > 0;

  const totalPages = serverData?.info?.pages ?? 1;
  const shouldShowPagination = serverData !== null && !serverError;
  const shouldShowFooter = shouldShowPagination || hasSelectedCards;

  const SIDEBAR_WIDTH_PX = 400;
  const paginationContainerWidth = isSidebarOpen
    ? `w-[calc(100%-${SIDEBAR_WIDTH_PX}px)]`
    : 'w-full';

  return (
    <div
      className={`flex min-h-screen w-full transition-all duration-300 ${isSidebarOpen ? 'pr-100' : 'pr-0'}`}
    >
      {isSidebarOpen && (
        <button
          onClick={handleCloseDetails}
          type="button"
          aria-label={t('btnCloseAriaLabel')}
          className="bg-accent/10 fixed inset-0 z-1 h-full w-full cursor-default border-none p-0 backdrop-blur-xs"
        />
      )}
      <section className="flex flex-1 flex-col items-center justify-between gap-2">
        <div className="flex w-full grow flex-col items-center gap-2">
          <HomeContent
            isLoading={false}
            isFetching={false}
            error={
              serverError ? formatErrorMessage(serverError, tErrors) : null
            }
            activeSearchQuery={initialQuery}
            onRefresh={handleRefresh}
            onSearch={onSearch}
            cardList={
              <CardList
                cards={serverData?.results ?? []}
                isSidebarOpen={isSidebarOpen}
              />
            }
          />
        </div>

        {shouldShowFooter && (
          <div className="bg-footer-bg shadow-footer sticky bottom-0 z-1000 -mx-5 mt-auto flex w-[calc(100%+40px)] flex-col items-center gap-2 px-5 pt-4 pb-2 transition-all duration-300">
            {shouldShowPagination && (
              <div className={`py-1 ${paginationContainerWidth}`}>
                <Pagination
                  currentPage={initialPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
            {hasSelectedCards && (
              <div className="bg-footer-bg shadow-footer mx-auto rounded-2xl border-2 px-10 py-2 transition-all duration-300">
                <Flyout />
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
