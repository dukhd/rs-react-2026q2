'use client';

import { useTranslations } from 'next-intl';
import { type JSX, useState, useTransition } from 'react';

import { STORAGE_KEYS } from '@/constants/storage-keys';

import Button from './ui/button';
import SearchInput from './ui/search-input';

interface SearchBarProps {
  initialValue?: string;
  onSearch: (formData: FormData) => Promise<void>;
}

const SearchBar = ({
  initialValue = '',
  onSearch,
}: SearchBarProps): JSX.Element => {
  const t = useTranslations('SearchBar');
  const [query, setQuery] = useState<string>(initialValue);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (
    event: React.SyntheticEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    const trimmedInitial = initialValue.trim();

    if (trimmedQuery === trimmedInitial) {
      return;
    }

    try {
      if (trimmedQuery) {
        localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, trimmedQuery);
      } else {
        localStorage.removeItem(STORAGE_KEYS.SEARCH_TERM);
      }
    } catch (error) {
      console.error('Failed to write to localStorage:', error);
    }

    setQuery(trimmedQuery);

    const formData = new FormData();
    formData.set('search', trimmedQuery);
    formData.set('page', '1');

    startTransition(async () => {
      await onSearch(formData);
    });
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      role="search"
      className="mx-auto flex w-full max-w-lg justify-center gap-3 self-center"
    >
      <SearchInput
        id="search-input"
        name="search-input"
        placeholder={t('placeholder')}
        value={query}
        onChange={handleInputChange}
        disabled={isPending}
      />
      <Button
        text={isPending ? '...' : t('btn')}
        type="submit"
        disabled={isPending}
      />
    </form>
  );
};

export default SearchBar;
