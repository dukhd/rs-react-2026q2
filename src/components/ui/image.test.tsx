import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, test } from 'vitest';

import Image from './image';

type Props = ComponentProps<typeof Image>;

const defaultProps: Props = {
  alt: 'RSS',
  src: 'https://app.rs.school/static/images/im-fine.svg',
  size: 's',
};

describe('Image', () => {
  test('Should render an image element with correct attributes', () => {
    render(<Image {...defaultProps} priority={true} />);

    const element = screen.getByRole('img');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('src', defaultProps.src);
    expect(element).toHaveAttribute('loading', 'eager');
    expect(element).toHaveAttribute('fetchPriority', 'high');
  });

  test('should render an image with lazy loading and auto fetch priority', () => {
    render(<Image {...defaultProps} priority={false} />);

    const element = screen.getByRole('img');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('loading', 'lazy');
    expect(element).toHaveAttribute('fetchPriority', 'auto');
  });

  test('Should render fallback UI when image fails to load', () => {
    render(<Image {...defaultProps} />);

    const element = screen.getByRole('img');
    fireEvent.error(element);
    expect(element).not.toBeInTheDocument();
    const fallbackText = screen.getByText(/no image available/i);
    expect(fallbackText).toBeInTheDocument();
  });

  test('should have correct alt text with avatar suffix', () => {
    render(<Image {...defaultProps} />);

    const element = screen.getByAltText(/rss avatar/i);
    expect(element).toBeInTheDocument();
  });
});
