import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, test, vi } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';
import selectedCardsReducer from '@/store/selected-cards-slice';
import { downloadCharactersCSV } from '@/utils/download-csv';

import Flayout from './flayout';

vi.mock('@/utils/download-csv', () => ({
  downloadCharactersCSV: vi.fn(),
}));

const renderFlayout = (initialCards = mockCharacters) => {
  const store = configureStore({
    reducer: { selectedCards: selectedCardsReducer },
    preloadedState: { selectedCards: { cards: initialCards } },
  });

  return {
    ...render(
      <Provider store={store}>
        <Flayout />
      </Provider>
    ),
    store,
  };
};

describe('Flayout Component', () => {
  test('Should render correctly with selected cards count', () => {
    renderFlayout([mockCharacters[0], mockCharacters[1]]);

    expect(screen.getByText(/Selected: 2/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
  });

  test('Should clear store when Unselect all is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderFlayout([mockCharacters[0]]);

    const unselectAllButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    await user.click(unselectAllButton);

    expect(store.getState().selectedCards.cards).toHaveLength(0);
  });

  test('Should call downloadCharactersCSV utility when Download is clicked', async () => {
    const user = userEvent.setup();
    const testCards = [mockCharacters[0]];
    renderFlayout(testCards);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    await user.click(downloadButton);

    expect(downloadCharactersCSV).toHaveBeenCalledWith(testCards);
  });
});
