import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import type { CharacterSchema } from '@/types/interfaces';

import CardList from './card-list';

const mockCards: CharacterSchema[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Earth (Replacement Dimension)', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: [],
    url: '',
    created: '',
  },
];

describe('Card List', () => {
  test('Should render a list with correct number of cards and data', () => {
    render(<CardList cards={mockCards} />);

    const element = screen.getByRole('list');
    expect(element).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockCards.length);
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
  });

  test('Should pass priority to first two items', () => {
    render(<CardList cards={mockCards} />);

    const elements = screen.getAllByRole('img');
    expect(elements[0]).toHaveAttribute('loading', 'eager');
    expect(elements[1]).toHaveAttribute('loading', 'eager');
  });
});
