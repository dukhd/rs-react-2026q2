import { PureComponent } from 'react';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import storage from '@/services/local-storage';

import Button from './ui/button';
import SearchInput from './ui/search-input';
interface SearchBarProps {
  onSearch: (trimmedQuery: string) => void;
  initialValue?: string;
}

interface SearchBarState {
  query: string;
}

const SEARCH_PLACEHOLDER = 'Search characters...';

class SearchBar extends PureComponent<SearchBarProps, SearchBarState> {
  private lastSearchedQuery: string = this.props.initialValue?.trim() || '';

  state: SearchBarState = {
    query: this.props.initialValue || '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = this.state.query.trim();
    if (trimmedQuery === this.lastSearchedQuery) return;
    this.lastSearchedQuery = trimmedQuery;

    this.setState({ query: trimmedQuery });
    storage.save(STORAGE_KEYS.SEARCH_TERM, trimmedQuery);
    this.props.onSearch(trimmedQuery);
  };

  render() {
    return (
      <form onSubmit={this.handleSearchSubmit} role="search">
        <SearchInput
          id="search-input"
          name="Search query"
          placeholder={SEARCH_PLACEHOLDER}
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <Button text="Search" type="submit" />
      </form>
    );
  }
}

export default SearchBar;
