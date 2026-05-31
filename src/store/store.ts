import { configureStore } from '@reduxjs/toolkit';

import { charactersApi } from '@/services/characters-api';

import selectedCardsReducer from './selected-cards-slice';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
