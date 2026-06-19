import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import SearchBar from '../../../components/search-bar';

vi.mock('@/services/local-storage', () => ({
  default: vi.fn(() => [null, vi.fn()]),
}));

describe('Search Bar', () => {
  const onSearchMock = vi.fn();

  const setup = (initialValue = 'Rick') => {
    const user = userEvent.setup();
    const utils = render(
      <SearchBar onSearch={onSearchMock} initialValue={initialValue} />
    );
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });
    return { user, input, button, ...utils };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should render with initial value', () => {
    const { input, button } = setup('Rick');
    expect(input).toHaveValue('Rick');
    expect(button).toBeInTheDocument();
  });

  test('Should handle typing', async () => {
    const { user, input } = setup('');
    await user.type(input, 'Morty');
    expect(input).toHaveValue('Morty');
  });

  test('Should trim, save to storage and call onSearch', async () => {
    const { user, input, button } = setup('');

    await user.type(input, '   Rick   ');
    await user.click(button);

    expect(input).toHaveValue('Rick');
    expect(onSearchMock).toHaveBeenCalledWith('Rick');
  });

  test('Should not trigger search for duplicate query', async () => {
    const { user, button } = setup('Rick');
    await user.click(button);
    expect(onSearchMock).not.toHaveBeenCalled();
  });

  test('Should trigger search on Enter', async () => {
    const { user, input } = setup('');
    await user.type(input, 'Morty{Enter}');
    expect(onSearchMock).toHaveBeenCalledWith('Morty');
  });
});
