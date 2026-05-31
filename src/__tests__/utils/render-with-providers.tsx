import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { charactersApi } from '@/services/characters-api';
import selectedCardsReducer from '@/store/selected-cards-slice';

const rootReducer = combineReducers({
  selectedCards: selectedCardsReducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
});

interface TestState {
  selectedCards?: ReturnType<typeof selectedCardsReducer>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  preloadedState: TestState = {}
) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
    preloadedState,
  });

  const renderResult = render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );

  return {
    ...renderResult,
    store,
  };
}
