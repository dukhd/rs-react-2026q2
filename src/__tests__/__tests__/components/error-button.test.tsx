import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import ErrorButton from '../../../components/error-button';

describe('Error Button', () => {
  test('Should render error button', () => {
    render(<ErrorButton />);
    const element = screen.getByRole('button', { name: /trigger error/i });
    expect(element).toBeInTheDocument();
  });

  test('Should throw error when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: /trigger error/i });
    await expect(user.click(button)).rejects.toThrow('Testing Errors!');
  });
});
