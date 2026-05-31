import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';
import { renderWithProviders } from '@/__tests__/utils/render-with-providers';

import Checkbox from './checkbox';

interface TestState {
  selectedCards?: {
    cards: typeof mockCharacters;
  };
}

const renderCheckbox = (preloadedState: TestState = {}) => {
  return renderWithProviders(
    <Checkbox card={mockCharacters[0]} />,
    preloadedState
  );
};

describe('Checkbox Component', () => {
  test('Should be unchecked by default', () => {
    renderCheckbox({ selectedCards: { cards: [] } });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('Should be checked when item is in selectedCards', () => {
    renderCheckbox({ selectedCards: { cards: [mockCharacters[0]] } });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('Should toggle item in store and change state on click', async () => {
    const user = userEvent.setup();
    const { store } = renderCheckbox({ selectedCards: { cards: [] } });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(store.getState().selectedCards.cards).toContainEqual(
      mockCharacters[0]
    );
  });
});
