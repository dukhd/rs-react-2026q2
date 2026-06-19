import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import { charactersApi } from '@/services/characters-api';
import selectedCardsReducer from '@/store/selected-cards-slice';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams('')),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  })),
  useParams: vi.fn(() => ({})),
}));

const rootReducer = combineReducers({
  selectedCards: selectedCardsReducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
});

type RootState = ReturnType<typeof rootReducer>;

interface ExtendedRenderOptions {
  preloadedState?: Partial<RootState>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {} }: ExtendedRenderOptions = {}
) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
    preloadedState: preloadedState,
  });

  const renderResult = render(<Provider store={store}>{ui}</Provider>);

  return {
    ...renderResult,
    store,
  };
}
