import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import Header from '@/components/header';
import { useTheme } from '@/hooks/use-theme';
import { useThemeAction } from '@/hooks/use-theme-action';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

vi.mock('next/link', () => ({
  default: ({
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

vi.mock('@/hooks/use-theme', () => ({
  useTheme: vi.fn(),
}));

vi.mock('@/hooks/use-theme-action', () => ({
  useThemeAction: vi.fn(),
}));

let currentDarkMode = false;
const mockToggleTheme = vi.fn(() => {
  currentDarkMode = !currentDarkMode;
});

const renderHeader = (currentPath = '/') => {
  vi.mocked(usePathname).mockReturnValue(currentPath);
  vi.mocked(useTheme).mockReturnValue(currentDarkMode);
  vi.mocked(useThemeAction).mockReturnValue(mockToggleTheme);

  return render(<Header />);
};

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentDarkMode = false;
  });

  test('Should render title and navigation links', () => {
    renderHeader('/');

    expect(
      screen.getByRole('heading', { name: /Rick and Morty/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  test('Navigation links have correct href attributes', () => {
    renderHeader('/');

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
    renderHeader('/about');

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(aboutLink).toHaveClass('underline decoration-2');
    expect(aboutLink).not.toHaveClass('no-underline');

    expect(homeLink).toHaveClass('no-underline');
    expect(homeLink).not.toHaveClass('underline decoration-2');
  });

  test('Should toggle theme on button click', async () => {
    const user = userEvent.setup();

    const { rerender } = renderHeader('/');

    const themeButton = screen.getByRole('button', {
      name: /Switch to dark theme/i,
    });
    expect(themeButton).toBeInTheDocument();

    await user.click(themeButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);

    vi.mocked(useTheme).mockReturnValue(currentDarkMode);
    rerender(<Header />);

    expect(
      screen.getByRole('button', { name: /Switch to light theme/i })
    ).toBeInTheDocument();
  });
});
