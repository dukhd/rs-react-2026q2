import { Component } from 'react';

import storage from '@/services/local-storage';

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
        <h1 className="text-3xl font-bold text-blue-950">RS React App</h1>
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
