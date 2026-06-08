import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import GenderSelector from '../GenderSelector';

describe('GenderSelector Component', () => {
  test('Should render select with label, placeholder, and gender options', () => {
    render(<GenderSelector />);

    expect(screen.getByText('Gender')).toBeInTheDocument();

    const label = screen.getByRole('combobox');
    expect(label).toBeInTheDocument();

    const placeholderOption = screen.getByText<HTMLOptionElement>('Select a gender');
    expect(placeholderOption).toBeDisabled();
    expect(placeholderOption.value).toBe('');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);

    expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Female' })).toBeInTheDocument();
  });

  test('Should correctly change value when user selects an option', async () => {
    render(<GenderSelector />);
    const select = screen.getByRole<HTMLSelectElement>('combobox');

    expect(select.value).toBe('');

    await userEvent.selectOptions(select, 'Female');

    expect(select.value).toBe('Female');

    const femaleOption = screen.getByRole<HTMLOptionElement>('option', { name: 'Female' });
    const maleOption = screen.getByRole<HTMLOptionElement>('option', { name: 'Male' });

    expect(femaleOption.selected).toBe(true);
    expect(maleOption.selected).toBe(false);
  });

  test('Should display error message and apply error theme classes when error prop is provided', () => {
    const errorMessage = 'Please select a gender';
    render(<GenderSelector error={errorMessage} />);

    const errorSpan = screen.getByText(errorMessage);
    expect(errorSpan).toBeInTheDocument();
    expect(errorSpan).toHaveClass('visible', 'opacity-100');

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-error/50');
  });
});
