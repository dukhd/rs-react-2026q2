import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Loader from '../../../components/loader/loader';

describe('Loader', () => {
  test('Should render loader with "Loading..." text', () => {
    render(<Loader />);
    const element = screen.getByRole('status');
    expect(element).toHaveTextContent(/Loading\.\.\./i);
  });

  test('Should contain a screen-reader only text', () => {
    render(<Loader />);
    const srOnlyText = screen.getByText(/loading\.\.\./i, {
      selector: '.sr-only',
    });
    expect(srOnlyText).toBeInTheDocument();
  });
});
