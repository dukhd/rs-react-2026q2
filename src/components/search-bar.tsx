import { type JSX, useState } from 'react';

import Button from './ui/button';
import SearchInput from './ui/search-input';
interface SearchBarProps {
  onSearch: (trimmedQuery: string) => void;
  initialValue?: string;
}

const SEARCH_PLACEHOLDER = 'Search by name';

const SearchBar = ({
  onSearch,
  initialValue = '',
}: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState<string>(initialValue);
  const [prevInitialValue, setPrevInitialValue] = useState(initialValue);

  if (initialValue !== prevInitialValue) {
    setQuery(initialValue);
    setPrevInitialValue(initialValue);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    setQuery(trimmedQuery);
    if (trimmedQuery !== prevInitialValue.trim()) {
      setPrevInitialValue(trimmedQuery);
      onSearch(trimmedQuery);
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      role="search"
      className="mx-auto flex w-full max-w-lg justify-center gap-3 self-center"
    >
      <SearchInput
        id="search-input"
        name="Search query"
        placeholder={SEARCH_PLACEHOLDER}
        value={query}
        onChange={handleInputChange}
      />
      <Button text="Search" type="submit" />
    </form>
  );
};

export default SearchBar;
