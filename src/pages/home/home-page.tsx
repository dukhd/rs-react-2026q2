import { type JSX } from 'react';
import { useSelector } from 'react-redux';

import Flyout from '@/components/flyout';
import Pagination from '@/components/pagination/pagination';
import { useHomePage } from '@/hooks/use-home-page';
import type { RootState } from '@/store/store';
import { formatErrorMessage } from '@/utils/error-formatter';

import { HomeContent } from './components/home-content';
import { HomeSidebar } from './components/home-sidebar';

const HomePage = (): JSX.Element => {
  const {
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
  } = useHomePage();

  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.cards
  );
  const hasSelectedCards = selectedCards.length > 0;
  const shouldShowPagination = !isLoading && !error;
  const shouldShowFooter = shouldShowPagination || hasSelectedCards;

  return (
    <div
      className={`flex min-h-screen w-full transition-all duration-300 ${isSidebarOpen ? 'pr-100' : 'pr-0'}`}
    >
      {isSidebarOpen && (
        <button
          onClick={handleCloseDetails}
          type="button"
          aria-label="Close details"
          className="fixed inset-0 z-0 h-full w-full cursor-default border-none bg-transparent p-0"
        />
      )}
      <section className="flex flex-1 flex-col items-center justify-between gap-2">
        <div className="flex w-full grow flex-col items-center gap-2">
          <HomeContent
            isLoading={isLoading || isFetching}
            error={error ? formatErrorMessage(error) : null}
            cards={data?.results ?? []}
            activeSearchQuery={activeSearchQuery}
            isSidebarOpen={isSidebarOpen}
            onSearch={handleSearch}
            onCardClick={handleCardClick}
          />
        </div>

        {shouldShowFooter && (
          <div className="bg-footer-bg shadow-footer sticky bottom-0 z-1000 -mx-5 mt-auto flex w-[calc(100%+40px)] flex-col items-center gap-2 px-5 pt-4 pb-2 transition-all duration-300">
            {shouldShowPagination && (
              <div
                className={`py-1 ${isSidebarOpen ? 'w-[calc(100%-400px)]' : 'w-full'}`}
              >
                <Pagination
                  currentPage={currentPage}
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
      <HomeSidebar isOpen={isSidebarOpen} onClose={handleCloseDetails} />
    </div>
  );
};

export default HomePage;
