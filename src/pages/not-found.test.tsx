import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import NotFoundPage from './not-found';

describe('NotFoundPage Component', () => {
  test('Should render Not Found page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText(/Wubba Lubba Dub-Dub/i)).toBeInTheDocument();
  });

  test('Should contain a link that redirects to the home page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /return home/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
