import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import FallbackUI from '@/app/error';

const mockError = new Error('Test application error') as Error & {
  digest?: string;
};
mockError.digest = 'test-digest-123';

const mockReset = vi.fn();

const renderFallback = (customReset = mockReset) => {
  return render(<FallbackUI error={mockError} reset={customReset} />);
};

describe('Fallback UI', () => {
  test('Should render the Fallback UI elements correctly', () => {
    renderFallback();

    const title = screen.getByRole('heading', {
      level: 1,
      name: 'Oooooops! Something went wrong!',
    });
    expect(title).toBeInTheDocument();
    const image = screen.getByAltText('The main characters of Rick and Morty');
    expect(image).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toBeInTheDocument();
  });

  test('Should call onReturn callback when "Try again" button is clicked', async () => {
    const customResetMock = vi.fn();
    const user = userEvent.setup();
    renderFallback(customResetMock);

    const button = screen.getByRole('button', { name: /try again/i });
    await user.click(button);
    expect(customResetMock).toHaveBeenCalledTimes(1);
  });
});
