import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Header from '../Header';

describe('Header Component', () => {
  test('Should render Header component', () => {
    render(<Header />);
    const title = screen.getByRole('heading');
    expect(title).toHaveTextContent(/The grand submission/i);
  });
});
