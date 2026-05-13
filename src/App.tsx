import { type JSX, useState } from 'react';

import useLocalStorage from '@/services/local-storage';

import ErrorButton from './components/error-button';
import Header from './components/header';
import Pagination from './components/pagination/pagination';
import SearchBar from './components/search-bar';
import SearchResult from './components/search-result';
import { STORAGE_KEYS } from './constants/storage-keys';

const App = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useLocalStorage(
    STORAGE_KEYS.SEARCH_TERM,
    ''
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
    setTotalPages(1);
  };

  return (
    <>
      <header className="bg-header-bg border-b-accent shadow-header fixed top-0 z-1000 w-full border-b-6 px-5 py-4">
        <Header />
      </header>
      <main className="flex flex-col items-center gap-2 px-5 pt-22 pb-20">
        <div className="self-start">
          <ErrorButton />
        </div>
        <div className="mx-auto my-0 flex max-w-360 flex-col gap-6">
          <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
          <SearchResult
            query={searchTerm}
            page={currentPage}
            onDataLoaded={setTotalPages}
            onLoadingChange={setIsDataLoading}
            onError={setIsError}
          />
        </div>
      </main>
      {!isDataLoading && !isError && (
        <footer className="bg-footer-bg shadow-footer fixed bottom-0 z-1000 w-full px-5 py-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </footer>
      )}
    </>
  );
};

export default App;
