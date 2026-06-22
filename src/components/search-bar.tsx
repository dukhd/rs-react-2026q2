import { useTranslations } from 'next-intl';
import { type JSX, useState } from 'react';

import Button from './ui/button';
import SearchInput from './ui/search-input';
interface SearchBarProps {
  onSearch: (trimmedQuery: string) => void;
  initialValue?: string;
}

const SearchBar = ({
  onSearch,
  initialValue = '',
}: SearchBarProps): JSX.Element => {
  const t = useTranslations('SearchBar');
  const [query, setQuery] = useState<string>(initialValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    setQuery(trimmedQuery);
    if (trimmedQuery !== initialValue.trim()) {
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
        placeholder={t('placeholder')}
        value={query}
        onChange={handleInputChange}
      />
      <Button text={t('btn')} type="submit" />
    </form>
  );
};

export default SearchBar;
