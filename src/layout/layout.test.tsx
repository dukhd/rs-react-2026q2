import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, test, vi } from 'vitest';

import Layout from './layout';

vi.mock('@/components/header', () => ({
  default: () => <div>Header Mock</div>,
}));

vi.mock('@/components/error-boundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Layout Component', () => {
  test('Should render header correctly', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('Should render child routes via Outlet', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div data-testid="child">Main Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Main Page');
  });
});
