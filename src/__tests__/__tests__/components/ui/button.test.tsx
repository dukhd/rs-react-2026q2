import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { describe, expect, test, vi } from 'vitest';

import Button from '../../../../components/ui/button';

type Props = ComponentProps<typeof Button>;

const defaultProps: Props = {
  text: 'Search',
  type: 'submit',
  onClick: vi.fn(),
};

describe('Button', () => {
  test('Should render a button element', () => {
    render(<Button {...defaultProps} />);

    const element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
  });

  test('should apply correct type attribute', () => {
    render(<Button {...defaultProps} />);

    const element = screen.getByRole('button');
    expect(element).toHaveAttribute('type', defaultProps.type);
  });

  test('should display the provided text content', () => {
    render(<Button {...defaultProps} />);

    const element = screen.getByRole('button');
    expect(element).toHaveTextContent(defaultProps.text);
  });

  test('should call onClick handler when clicked', async () => {
    const user = userEvent.setup();
    render(<Button {...defaultProps} onClick={defaultProps.onClick} />);

    const element = screen.getByRole('button');
    await user.click(element);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('should be visible and have accent styling', () => {
    render(<Button {...defaultProps} />);
    const element = screen.getByRole('button');

    expect(element).toBeVisible();
    expect(element).toHaveClass('bg-accent');
  });
});
