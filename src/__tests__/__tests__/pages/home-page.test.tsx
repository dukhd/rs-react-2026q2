import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';
import { errorHandlers } from '@/__tests__/msw/error-handlers';
import { server } from '@/__tests__/msw/server';
import { renderWithProviders } from '@/__tests__/utils/render-with-providers';
import { resolveLoading } from '@/__tests__/utils/resolve-loading';
import HomePage from '@/app/page';
import { CHARACTER_URL } from '@/constants/api-url';
import { STORAGE_KEYS } from '@/constants/storage-keys';

const renderHomePage = () => {
  return renderWithProviders(<HomePage />);
};

const mockApiResponse = {
  info: { count: 2, pages: 2, next: `${CHARACTER_URL}?page=2`, prev: null },
  results: [mockCharacters[0]],
};

const mockApiResponsePage2 = {
  info: { count: 2, pages: 2, next: null, prev: `${CHARACTER_URL}?page=1` },
  results: [mockCharacters[1]],
};

describe('Home Page Component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('Should initialize with search term from localStorage', () => {
    const savedTerm = 'Rick';
    localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, savedTerm);

    renderHomePage();

    const input = screen.getByRole<HTMLInputElement>('searchbox');
    expect(input.value).toBe(savedTerm);
    expect(Storage.prototype.getItem).toHaveBeenCalledWith(
      STORAGE_KEYS.SEARCH_TERM
    );
  });

  test('Should perform initial API call on mount if search term exists in localStorage', async () => {
    const savedTerm = 'Rick';
    localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, savedTerm);

    renderHomePage();
    expect(screen.getByRole('status')).toBeInTheDocument();

    await resolveLoading();

    const cards = await screen.findAllByRole('listitem');
    expect(cards).toHaveLength(1);
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  test('Should initialize with empty string if localStorage contains an empty string', () => {
    localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, '');
    renderHomePage();
    const input = screen.getByRole<HTMLInputElement>('searchbox');
    expect(input.value).toBe('');
  });

  test('Should update SearchResult when a new search is performed', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    renderHomePage();

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'Morty');
    await user.click(button);

    await waitFor(() => {
      const cards = screen.getAllByRole('listitem');
      expect(cards).toHaveLength(1);
      expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
    });
    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_TERM, 'Morty');
  });

  test('Should trim whitespace from search input before saving to localStorage', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    renderHomePage();

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, '  Morty  ');
    await user.click(button);

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith(
        STORAGE_KEYS.SEARCH_TERM,
        'Morty'
      );
    });
  });

  test('Should display error message when API fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    server.use(errorHandlers.internalError());

    renderHomePage();
    await resolveLoading();
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'ErrorQuery');
    await user.click(button);

    await resolveLoading();

    const errorMessage = await screen.findByText(/oops/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('Should render ErrorButton and it is present in the document', () => {
    renderHomePage();
    const errorButton = screen.getByRole('button', { name: /trigger error/i });
    expect(errorButton).toBeInTheDocument();
  });

  test('Should trigger refresh and update data when Refresh button is clicked', async () => {
    const user = userEvent.setup();

    renderHomePage();
    await resolveLoading();
    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    await user.click(refreshButton);
    await resolveLoading();
    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
  });

  test('Should cache search queries and not refetch when searching for the same term again', async () => {
    let searchRequestCount = 0;
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    server.use(
      http.get(CHARACTER_URL, ({ request }) => {
        searchRequestCount++;
        const url = new URL(request.url);
        const name = url.searchParams.get('name');

        if (name === 'Morty') {
          return HttpResponse.json(mockApiResponsePage2);
        }
        return HttpResponse.json(mockApiResponse);
      })
    );

    renderHomePage();
    await resolveLoading();

    const searchFor = async (term: string) => {
      const input = screen.getByRole('searchbox');
      const searchButton = screen.getByRole('button', { name: /search/i });

      await waitFor(() => {
        expect(input).toBeVisible();
        expect(input).toBeEnabled();
      });

      await user.clear(input);
      await user.type(input, term);
      await user.click(searchButton);
      await resolveLoading();
    };

    await searchFor('Morty');
    await screen.findByText(/Morty Smith/i);
    expect(searchRequestCount).toBe(2);

    await searchFor('Rick');
    await screen.findByText(/Rick Sanchez/i);
    expect(searchRequestCount).toBe(3);

    await searchFor('Morty');
    await screen.findByText(/Morty Smith/i);
    expect(searchRequestCount).toBe(3);
  });
});
