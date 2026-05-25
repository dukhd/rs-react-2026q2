import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CharacterSchema } from '@/types/interfaces';

interface SelectedCardsState {
  cards: CharacterSchema[];
}

const initialState: SelectedCardsState = {
  cards: [],
};

const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<CharacterSchema>) => {
      const exists = state.cards.find((card) => card.id === action.payload.id);
      if (exists) {
        state.cards = state.cards.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.cards.push(action.payload);
      }
    },
    unselectAll: (state) => {
      state.cards = [];
    },
  },
});

export const { toggleItem, unselectAll } = selectedCardsSlice.actions;
export default selectedCardsSlice.reducer;
