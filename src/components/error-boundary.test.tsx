import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import ErrorBoundary from './error-boundary';
import ErrorButton from './error-button';

const ProblemChild = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) throw new Error('Testing Errors!');
  return <div>Successfully recovered!</div>;
};

describe('Error Boundary', () => {
  const consoleSpy = vi.spyOn(console, 'error');
  beforeEach(() => {
    consoleSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderBoundary = (shouldThrow = true) => {
    return render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={shouldThrow} />
      </ErrorBoundary>
    );
  };

  test('Should render fallback UI and log error when child throws', () => {
    renderBoundary(true);

    const title = screen.getByRole('heading', { name: /oooooops!/i });
    const button = screen.getByRole('button', { name: /try again/i });

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();
  });

  test('Should display fallback UI when ErrorButton throws', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const triggerButton = screen.getByRole('button', {
      name: /trigger error/i,
    });
    await user.click(triggerButton);
    expect(
      screen.getByRole('heading', { name: /oooooops!/i })
    ).toBeInTheDocument();
  });

  test('Should recover from error when "try again" is clicked', async () => {
    const user = userEvent.setup();

    const { rerender } = renderBoundary(true);
    expect(screen.getByText(/oooooops!/i)).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /try again/i });
    await user.click(button);

    expect(screen.queryByText(/oooooops!/i)).not.toBeInTheDocument();
    expect(screen.getByText(/successfully recovered!/i)).toBeInTheDocument();
  });
});
