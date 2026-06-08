import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import TermsCheckbox from '../TermsCheckbox';

describe('TermsCheckbox Component', () => {
  test('Should render checkbox with correct label and required attribute', () => {
    render(<TermsCheckbox />);

    const checkbox = screen.getByRole('checkbox', { name: /I agree to the Terms and Conditions/i });

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeRequired();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveClass('border-border-strong');
  });

  test('Should toggle checked state when user clicks on the checkbox or label', async () => {
    render(<TermsCheckbox />);

    const checkbox = screen.getByRole<HTMLInputElement>('checkbox');
    const label = screen.getByText(/I agree to the Terms and Conditions/i);

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(label);
    expect(checkbox).not.toBeChecked();
  });

  test('Should display error message and apply error styles when error prop is provided', () => {
    const errorMessage = 'You must accept the terms';
    render(<TermsCheckbox error={errorMessage} />);

    const errorSpan = screen.getByText(errorMessage);
    expect(errorSpan).toBeInTheDocument();
    expect(errorSpan).toHaveClass('visible', 'opacity-100');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('border-error/50');
    expect(checkbox).not.toHaveClass('border-border-strong');
  });
});
