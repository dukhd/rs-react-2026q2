import { Component } from 'react';

import storage from '@/services/local-storage';

import ErrorButton from './components/error-button';
import Header from './components/header';
import Pagination from './components/pagination/pagination';
import SearchBar from './components/search-bar';
import SearchResult from './components/search-result';
import { STORAGE_KEYS } from './constants/storage-keys';

class App extends Component {
  state = {
    searchTerm: storage.get(STORAGE_KEYS.SEARCH_TERM) || '',
  };

  handleSearch = (query: string) => {
    this.setState({ searchTerm: query });
  };

  render() {
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
            <SearchBar
              onSearch={this.handleSearch}
              initialValue={this.state.searchTerm}
            />
            <SearchResult query={this.state.searchTerm} />
          </div>
        </main>
        <footer className="bg-footer-bg shadow-footer fixed bottom-0 z-1000 w-full px-5 py-2">
          <Pagination />
        </footer>
      </>
    );
  }
}

export default App;
