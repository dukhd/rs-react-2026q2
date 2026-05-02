import { PureComponent, type ReactNode } from 'react';

import { CHARACTER_URL } from '@/constants/api-url';
import ApiService from '@/services/api';
import { areAllCharacters } from '@/types/guards/are-all-characters.guard';
import type { AllCharactersSchema, CharacterSchema } from '@/types/interfaces';
import { ErrorFormatter } from '@/utils/error-formatter';

import Loader from './loader/loader';
import CardList from './ui/card-list';

interface SearchResultProps {
  query: string;
}

interface SearchResultState {
  data: CharacterSchema[];
  isLoading: boolean;
  error: string | null;
}

const apiService = new ApiService();
const errorFormatter = new ErrorFormatter();

class SearchResult extends PureComponent<SearchResultProps, SearchResultState> {
  private controller: AbortController | null = null;

  state: SearchResultState = {
    data: [],
    isLoading: true,
    error: null,
  };

  componentDidMount(): void {
    this.loadData(this.props.query);
  }

  componentDidUpdate(prevProps: SearchResultProps): void {
    if (prevProps.query !== this.props.query) {
      this.loadData(this.props.query);
    }
  }

  componentWillUnmount(): void {
    this.controller?.abort();
  }

  loadData(query: string): void {
    const urlToFetch = query
      ? `${CHARACTER_URL}/?name=${query}`
      : CHARACTER_URL;
    this.fetchData(urlToFetch);
  }

  async fetchData(url: string): Promise<void> {
    this.controller?.abort();
    this.controller = new AbortController();

    try {
      this.setState({ isLoading: true, error: null, data: [] });

      const response: AllCharactersSchema = await apiService.getData(
        url,
        areAllCharacters,
        this.controller.signal
      );

      this.setState({ data: response.results, isLoading: false });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      this.setState({
        error: errorFormatter.getMessage(error),
        isLoading: false,
      });
    }
  }

  render(): ReactNode {
    const { data, isLoading, error } = this.state;

    if (isLoading) return <Loader />;
    if (error)
      return (
        <div className="text-accent mt-10 text-center text-2xl tracking-wide">
          {error}
        </div>
      );

    return <CardList cards={data} />;
  }
}

export default SearchResult;
