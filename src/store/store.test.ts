import { describe, expect, test } from 'vitest';

import { charactersApi } from '@/services/characters-api';

import { store } from './store';

describe('Store Configuration', () => {
  test('Should initialize with the correct initial state structure', () => {
    const state = store.getState();

    expect(state.selectedCards).toBeDefined();
    expect(state.selectedCards.cards).toEqual([]);

    expect(state[charactersApi.reducerPath]).toBeDefined();
  });
});
