import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import Header from './header';

describe('Header Component', () => {
  test('Should render title and navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Rick and Morty/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  test('Navigation links have correct href attributes', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/about'
    );
  });

  test('Should apply active class to the current route link', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Header />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(aboutLink).toHaveClass('underline decoration-2');
    expect(aboutLink).not.toHaveClass('no-underline');

    expect(homeLink).toHaveClass('no-underline');
    expect(homeLink).not.toHaveClass('underline decoration-2');
  });
});
