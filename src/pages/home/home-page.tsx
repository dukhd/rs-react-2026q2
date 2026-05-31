import { type JSX } from 'react';

import Flyout from '@/components/flyout';
import Pagination from '@/components/pagination/pagination';
import CardList from '@/components/ui/card-list';
import { useAppSelector } from '@/hooks/store-hooks';
import { useHomePage } from '@/hooks/use-home-page';
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
    handleRefresh,
  } = useHomePage();

  const selectedCards = useAppSelector((state) => state.selectedCards.cards);
  const hasSelectedCards = selectedCards.length > 0;
  const shouldShowPagination = !isLoading && !error;
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
          aria-label="Close details"
          className="bg-accent/10 fixed inset-0 z-1 h-full w-full cursor-default border-none p-0 backdrop-blur-xs"
        />
      )}
      <section className="flex flex-1 flex-col items-center justify-between gap-2">
        <div className="flex w-full grow flex-col items-center gap-2">
          <HomeContent
            isLoading={isLoading || isFetching}
            error={error ? formatErrorMessage(error) : null}
            activeSearchQuery={activeSearchQuery}
            onRefresh={handleRefresh}
            onSearch={handleSearch}
            cardList={
              <CardList
                cards={data?.results ?? []}
                onCardClick={handleCardClick}
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
