import { PureComponent, type ReactNode } from 'react';

import { CHARACTER_URL } from '@/constants/api-url';
import ApiService from '@/services/api';
import { areAllCharacters } from '@/types/guards/are-all-characters.guard';
import type { AllCharactersSchema, CharacterSchema } from '@/types/interfaces';
import { ErrorFormatter } from '@/utils/error-formatter';

import CardList from './card-list';
import Loader from './loader/loader';

interface SearchState {
  data: CharacterSchema[];
  isLoading: boolean;
  error: string | null;
}

const apiService = new ApiService();
const errorFormatter = new ErrorFormatter();

class SearchResult extends PureComponent<object, SearchState> {
  private controller: AbortController | null = null;

  state: SearchState = {
    data: [],
    isLoading: true,
    error: null,
  };

  componentDidMount(): void {
    this.fetchData(CHARACTER_URL);
  }

  componentWillUnmount(): void {
    this.controller?.abort();
  }

  async fetchData(url: string): Promise<void> {
    if (this.controller) {
      this.controller.abort();
    }

    this.controller = new AbortController();

    try {
      this.setState({ isLoading: true, error: null });

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
    if (error) return <div>{error}</div>;

    return <CardList cards={data} />;
  }
}

export default SearchResult;
