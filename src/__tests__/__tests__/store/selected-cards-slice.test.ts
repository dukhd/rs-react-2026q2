import { describe, expect, test } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';

import selectedCardsReducer, {
  toggleItem,
  unselectAll,
} from '../../../store/selected-cards-slice';

describe('Selected Cards Slice', () => {
  test('Should return the initial state by default', () => {
    const result = selectedCardsReducer(undefined, { type: '' });
    expect(result).toEqual({ cards: [] });
  });

  test('Should add a card when calling toggleItem if it is not selected', () => {
    const initialState = { cards: [] };

    const newState = selectedCardsReducer(
      initialState,
      toggleItem(mockCharacters[0])
    );

    expect(newState.cards).toHaveLength(1);
    expect(newState.cards[0]).toEqual(mockCharacters[0]);
  });

  test('Should remove a card when calling toggleItem if it is already selected', () => {
    const initialState = { cards: [mockCharacters[0]] };

    const newState = selectedCardsReducer(
      initialState,
      toggleItem(mockCharacters[0])
    );

    expect(newState.cards).toHaveLength(0);
  });

  test('Should remove all cards when unselectAll is dispatched', () => {
    const initialState = { cards: [mockCharacters[0], mockCharacters[1]] };

    const newState = selectedCardsReducer(initialState, unselectAll());

    expect(newState.cards).toHaveLength(0);
  });
});
