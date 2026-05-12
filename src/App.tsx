import { Component } from 'react';

import storage from '@/services/local-storage';

import Footer from './components/footer';
import Header from './components/header';
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
        <main className="mx-auto my-0 flex max-w-360 flex-col gap-6 px-5 pt-28">
          <SearchBar
            onSearch={this.handleSearch}
            initialValue={this.state.searchTerm}
          />
          <SearchResult query={this.state.searchTerm} />
        </main>
        <footer className="mt-10 mb-5 px-5">
          <Footer />
        </footer>
      </>
    );
  }
}

export default App;
