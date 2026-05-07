import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';

import Card from './card';

describe('Card', () => {
  test('Should render a card element with correct data', () => {
    render(<Card card={mockCharacters[0]} />);

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
    render(<Card card={mockCharacters[0]} />);

    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Species:/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
  });

  test('Should pass priority prop correctly to the image', () => {
    render(<Card card={mockCharacters[0]} priority={true} />);

    const element = screen.getByRole('img');
    expect(element).toHaveAttribute('loading', 'eager');
    expect(element).toHaveAttribute('fetchpriority', 'high');
  });
});
