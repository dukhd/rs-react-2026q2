import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { errorHandlers } from '@/__tests__/msw/error-handlers';
import { server } from '@/__tests__/msw/server';
import { resolveLoading } from '@/__tests__/utils/resolve-loading';

import SearchResult from './search-result';

describe('Search Result', () => {
  const mockOnDataLoaded = vi.fn();
  const mockOnLoadingChange = vi.fn();
  const mockOnError = vi.fn();

  const mockProps = {
    query: '',
    page: 1,
    onDataLoaded: mockOnDataLoaded,
    onLoadingChange: mockOnLoadingChange,
    onError: mockOnError,
  };

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('Shows loader while data is loading', () => {
    render(<SearchResult {...mockProps} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(mockOnLoadingChange).toHaveBeenCalledWith(true);
  });

  test('Renders all cards after successful fetch', async () => {
    render(<SearchResult {...mockProps} />);
    const cards = await screen.findAllByRole('article');
    expect(cards).toHaveLength(2);
  });

  test('Fetches new data when query changes', async () => {
    const { rerender } = render(<SearchResult {...mockProps} />);
    await screen.findAllByRole('article');
    rerender(<SearchResult {...mockProps} query="Rick" />);
    expect(mockOnLoadingChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('status')).toBeInTheDocument();
    await resolveLoading();
    const card = screen.getByText(/rick sanchez/i);
    expect(card).toBeInTheDocument();
  });

  test('Displays no results message when no characters found', async () => {
    server.use(errorHandlers.notFound());
    render(<SearchResult {...mockProps} query="UnknownCharacter" />);
    expect(await screen.findByText(/no characters found/i)).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });

  test('Should display error message on API failure and keep console clean', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    server.use(errorHandlers.networkError());
    render(<SearchResult {...mockProps} />);
    expect(
      await screen.findByText(/network failure or API limit reached/i)
    ).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test('Aborts previous request when query changes', async () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');
    const { rerender } = render(<SearchResult {...mockProps} query="Rick" />);
    rerender(<SearchResult {...mockProps} query="Morty" />);
    await resolveLoading();
    expect(abortSpy).toHaveBeenCalled();
    const card = screen.getByText(/morty smith/i);
    expect(card).toBeInTheDocument();
  });
});
