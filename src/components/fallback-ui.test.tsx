import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import FallbackUI from './fallback-ui';

describe('Fallback UI', () => {
  test('Should render the Fallback UI elements correctly', () => {
    render(<FallbackUI onReturn={() => {}} />);

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
    const onReturnMock = vi.fn();
    const user = userEvent.setup();
    render(<FallbackUI onReturn={onReturnMock} />);

    const button = screen.getByRole('button', { name: /try again/i });
    await user.click(button);
    expect(onReturnMock).toHaveBeenCalledTimes(1);
  });
});
