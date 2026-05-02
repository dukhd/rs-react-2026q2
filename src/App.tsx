import { Component } from 'react';

import storage from '@/services/local-storage';

import ErrorButton from './components/error-button';
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
      <main className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-accent text-shadow-custom text-center text-3xl font-bold sm:text-left sm:text-4xl md:text-5xl">
            Rick and Morty
          </h1>
          <ErrorButton />
        </div>
        <SearchBar
          onSearch={this.handleSearch}
          initialValue={this.state.searchTerm}
        />
        <SearchResult query={this.state.searchTerm} />
      </main>
    );
  }
}

export default App;
