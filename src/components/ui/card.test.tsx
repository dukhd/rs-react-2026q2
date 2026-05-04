import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import type { CharacterSchema } from '@/types/interfaces';

import Card from './card';

const mockCharacter: CharacterSchema = {
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
};

describe('Card', () => {
  test('Should render a card element with correct data', () => {
    render(<Card card={mockCharacter} />);

    const element = screen.getByRole('article');
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /rick sanchez/i,
    });

    expect(element).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/alive/i)).toBeInTheDocument();
    expect(screen.getByText(/human/i)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
  });

  test('Should display correct labels', () => {
    render(<Card card={mockCharacter} />);

    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Species:/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
  });

  test('Should pass priority prop correctly to the image', () => {
    render(<Card card={mockCharacter} priority={true} />);

    const element = screen.getByRole('img');
    expect(element).toHaveAttribute('loading', 'eager');
    expect(element).toHaveAttribute('fetchpriority', 'high');
  });
});
