import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import NotFoundPage from '@/app/[locale]/not-found';

vi.mock('@/i18n/routing', () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('NotFoundPage Component', () => {
  test('Should render Not Found page', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText(/Wubba Lubba Dub-Dub/i)).toBeInTheDocument();
  });

  test('Should contain a link that redirects to the home page', () => {
    render(<NotFoundPage />);

    const homeLink = screen.getByRole('link', { name: /return home/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
