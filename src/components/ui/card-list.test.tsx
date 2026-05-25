import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, test, vi } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';
import selectedCardsReducer from '@/store/selected-cards-slice';

import CardList from './card-list';

const renderCardList = () => {
  const store = configureStore({
    reducer: { selectedCards: selectedCardsReducer },
  });
  return render(
    <Provider store={store}>
      <CardList cards={mockCharacters} onCardClick={vi.fn()} />
    </Provider>
  );
};

describe('Card List', () => {
  test('Should render a list with correct number of cards and data', () => {
    renderCardList();

    const element = screen.getByRole('list');
    expect(element).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockCharacters.length);
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
  });

  test('Should pass priority to first two items', () => {
    renderCardList();

    const elements = screen.getAllByRole('img');
    expect(elements[0]).toHaveAttribute('loading', 'eager');
    expect(elements[1]).toHaveAttribute('loading', 'eager');
  });
});
