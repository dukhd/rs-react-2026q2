import { describe, expect, test } from 'vitest';

import { COUNTRIES_LIST } from '@/form/config/countriesData';

import countriesReducer from '../countriesSlice';

describe('countriesSlice', () => {
  test('Should return the initial state with countries list', () => {
    const initialState = countriesReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      countries: COUNTRIES_LIST,
    });
  });
});
