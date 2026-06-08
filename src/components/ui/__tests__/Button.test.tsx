import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import Button from '../Button';

describe('Button Component', () => {
  const mockOnClick = vi.fn();

  test('Should render button with correct text and native type', () => {
    render(<Button type="submit" text="Ready to rock!" />);

    const button = screen.getByRole('button', { name: /Ready to rock!/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveClass('cursor-pointer');
  });

  test('Should call onClick handler when clicked', async () => {
    render(<Button type="button" text="Open uncontrolled form" onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /Open uncontrolled form/i });

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('Should look and behave correctly when disabled', async () => {
    render(<Button type="submit" text="Ready to rock!" disabled={true} onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /Ready to rock!/i });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveClass('cursor-not-allowed', 'opacity-50');
    expect(button).not.toHaveClass('cursor-pointer');

    await userEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
