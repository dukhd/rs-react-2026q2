import { useEffect } from 'react';

import { CHARACTER_URL } from '@/constants/api-url';
import { useFetch } from '@/hooks/use-fetch';
import { areAllCharacters } from '@/types/guards/are-all-characters.guard';

import Loader from './loader/loader';
import CardList from './ui/card-list';

interface SearchResultProps {
  query: string;
  page: number;
  onDataLoaded: (pages: number) => void;
}

const SearchResult = ({ query, page, onDataLoaded }: SearchResultProps) => {
  const urlToFetch = query
    ? `${CHARACTER_URL}/?name=${query}&page=${page}`
    : `${CHARACTER_URL}/?page=${page}`;

  const { data, isLoading, error } = useFetch(urlToFetch, areAllCharacters);

  useEffect(() => {
    if (data?.info?.pages) {
      onDataLoaded(data.info.pages);
    }
  }, [data, onDataLoaded]);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-second mt-10 text-center text-2xl tracking-wide">
        <span>{error}</span>
      </div>
    );

  return <CardList cards={data?.results ?? []} />;
};

export default SearchResult;
