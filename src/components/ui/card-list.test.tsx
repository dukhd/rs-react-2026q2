import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';

import CardList from './card-list';

describe('Card List', () => {
  test('Should render a list with correct number of cards and data', () => {
    render(<CardList cards={mockCharacters} onCardClick={vi.fn()} />);

    const element = screen.getByRole('list');
    expect(element).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockCharacters.length);
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
  });

  test('Should pass priority to first two items', () => {
    render(<CardList cards={mockCharacters} onCardClick={vi.fn()} />);

    const elements = screen.getAllByRole('img');
    expect(elements[0]).toHaveAttribute('loading', 'eager');
    expect(elements[1]).toHaveAttribute('loading', 'eager');
  });
});
