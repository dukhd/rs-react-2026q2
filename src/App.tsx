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
      <>
        <div>
          <h1 className="text-3xl font-bold text-blue-950">Rick and Morty</h1>
          <ErrorButton />
        </div>
        <SearchBar
          onSearch={this.handleSearch}
          initialValue={this.state.searchTerm}
        />
        <SearchResult query={this.state.searchTerm} />
      </>
    );
  }
}

export default App;
