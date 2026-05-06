import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { describe, expect, test, vi } from 'vitest';

import SearchInput from './search-input';

type Props = ComponentProps<typeof SearchInput>;

const mockProps: Props = {
  id: 'search-input',
  name: 'Search query',
  placeholder: 'Search by name',
  value: '',
  onChange: vi.fn(),
};

describe('Search input', () => {
  test('Should render input with correct attributes', () => {
    render(<SearchInput {...mockProps} />);

    const element = screen.getByRole('searchbox');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('id', mockProps.id);
    expect(element).toHaveAttribute('name', mockProps.name);
    expect(element).toHaveValue(mockProps.value);
  });

  test('Should have a screen-reader only label', () => {
    render(<SearchInput {...mockProps} />);

    const element = screen.getByRole('searchbox');
    expect(element).toBeInTheDocument();
    const label = screen.getByText(mockProps.name);
    expect(label).toHaveClass('sr-only');
  });

  test('Should call onChange when typing', async () => {
    const user = userEvent.setup();
    render(<SearchInput {...mockProps} />);

    const element = screen.getByRole('searchbox');
    await user.type(element, 'Rick');
    expect(mockProps.onChange).toHaveBeenCalledTimes(4);
  });
});
