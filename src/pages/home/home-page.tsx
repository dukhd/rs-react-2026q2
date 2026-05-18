import { type JSX } from 'react';

import Pagination from '@/components/pagination/pagination';
import { useHomePage } from '@/hooks/use-home-page';

import { HomeContent } from './components/home-content';
import { HomeSidebar } from './components/home-sidebar';

const HomePage = (): JSX.Element => {
  const {
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
  } = useHomePage();

  return (
    <div
      className={`flex w-full transition-all duration-300 ${isSidebarOpen ? 'pr-100' : 'pr-0'}`}
    >
      {isSidebarOpen && (
        <button
          onClick={handleCloseDetails}
          type="button"
          aria-label="Close details"
          className="fixed inset-0 z-0 h-full w-full cursor-default border-none bg-transparent p-0"
        />
      )}
      <section className="flex flex-1 flex-col items-center gap-2">
        <HomeContent
          isLoading={isLoading}
          error={error}
          cards={data?.results ?? []}
          activeSearchQuery={activeSearchQuery}
          isSidebarOpen={isSidebarOpen}
          onSearch={handleSearch}
          onCardClick={handleCardClick}
        />

        {!isLoading && !error && (
          <div
            className={`bg-footer-bg shadow-footer fixed bottom-0 left-0 z-1000 py-2 transition-all duration-300 ${
              isSidebarOpen ? 'w-[calc(100%-400px)]' : 'w-full'
            }`}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>
      <HomeSidebar isOpen={isSidebarOpen} onClose={handleCloseDetails} />
    </div>
  );
};

export default HomePage;
