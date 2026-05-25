import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import { ThemeProvider } from '@/context/theme-provider';

import Header from './header';

const renderHeader = ({ initialEntries = ['/'] } = {}) => {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <Header />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('Header Component', () => {
  test('Should render title and navigation links', () => {
    renderHeader();

    expect(
      screen.getByRole('heading', { name: /Rick and Morty/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  test('Navigation links have correct href attributes', () => {
    renderHeader();

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
    renderHeader({ initialEntries: ['/about'] });

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(aboutLink).toHaveClass('underline decoration-2');
    expect(aboutLink).not.toHaveClass('no-underline');

    expect(homeLink).toHaveClass('no-underline');
    expect(homeLink).not.toHaveClass('underline decoration-2');
  });

  test('Should toggle theme on button click', async () => {
    const user = userEvent.setup();
    renderHeader();

    const themeButton = screen.getByRole('button', {
      name: /Switch to dark theme/i,
    });
    expect(themeButton).toBeInTheDocument();

    await user.click(themeButton);

    expect(
      screen.getByRole('button', { name: /Switch to light theme/i })
    ).toBeInTheDocument();
  });
});
