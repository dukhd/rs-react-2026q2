import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { errorHandlers } from '@/__tests__/msw/error-handlers';
import { server } from '@/__tests__/msw/server';
import { resolveLoading } from '@/__tests__/utils/resolve-loading';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import selectedCardsReducer from '@/store/selected-cards-slice';

import HomePage from './home-page';

const renderHomePage = () => {
  const store = configureStore({
    reducer: { selectedCards: selectedCardsReducer },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>
  );
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
});
