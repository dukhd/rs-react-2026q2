import { PureComponent } from 'react';

import Button from './ui/button';
import SearchInput from './ui/search-input';

interface SearchBarProps {
  onSearch: (trimmedQuery: string) => void;
  initialValue?: string;
}

interface SearchBarState {
  query: string;
}

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
    if (trimmedQuery === this.lastSearchedQuery || !trimmedQuery) return;
    this.lastSearchedQuery = trimmedQuery;
    this.setState({ query: trimmedQuery });
    this.props.onSearch(trimmedQuery);
  };

  render() {
    return (
      <form onSubmit={this.handleSearchSubmit} role="search">
        <SearchInput
          id="search-input"
          name="Search query"
          placeholder="Enter movie title..."
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <Button text="Search" type="submit" />
      </form>
    );
  }
}

export default SearchBar;
