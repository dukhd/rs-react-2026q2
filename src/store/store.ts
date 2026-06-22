import { configureStore } from '@reduxjs/toolkit';

import selectedCardsReducer from './selected-cards-slice';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
