import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';
import { renderWithProviders } from '@/__tests__/utils/render-with-providers';
import { downloadCharactersCSV } from '@/utils/download-csv';

import Flyout from './flyout';

vi.mock('@/utils/download-csv', () => ({
  downloadCharactersCSV: vi.fn(),
}));

const renderFlyout = (initialCards = mockCharacters) => {
  return renderWithProviders(<Flyout />, {
    selectedCards: { cards: initialCards },
  });
};

describe('Flyout Component', () => {
  test('Should render correctly with selected cards count', () => {
    renderFlyout([mockCharacters[0], mockCharacters[1]]);

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
    const { store } = renderFlyout([mockCharacters[0]]);

    const unselectAllButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    await user.click(unselectAllButton);

    expect(store.getState().selectedCards.cards).toHaveLength(0);
  });

  test('Should call downloadCharactersCSV utility when Download is clicked', async () => {
    const user = userEvent.setup();
    const testCards = [mockCharacters[0]];
    renderFlyout(testCards);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    await user.click(downloadButton);

    expect(downloadCharactersCSV).toHaveBeenCalledWith(testCards);
  });
});
