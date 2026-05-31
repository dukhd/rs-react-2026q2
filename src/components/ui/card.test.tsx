import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';
import { renderWithProviders } from '@/__tests__/utils/render-with-providers';

import Card from './card';

const renderCard = () => {
  return renderWithProviders(<Card card={mockCharacters[0]} priority={true} />);
};

describe('Card', () => {
  test('Should render a card element with correct data', () => {
    renderCard();

    const cardHeader = screen.getByRole('banner');
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /rick sanchez/i,
    });

    expect(cardHeader).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/alive/i)).toBeInTheDocument();
    expect(screen.getByText(/human/i)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
  });

  test('Should display correct labels', () => {
    renderCard();

    expect(screen.getByText(/Species:/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
  });

  test('Should pass priority prop correctly to the image', () => {
    renderCard();

    const element = screen.getByRole('img');
    expect(element).toHaveAttribute('loading', 'eager');
    expect(element).toHaveAttribute('fetchpriority', 'high');
  });
});
