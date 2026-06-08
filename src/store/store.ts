import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from './countriesSlice';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
