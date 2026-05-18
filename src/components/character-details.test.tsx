import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOutletContext, useSearchParams } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { useFetch } from '@/hooks/use-fetch';

import CharacterDetails from './character-details';

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(),
  useOutletContext: vi.fn(),
}));

vi.mock('@/hooks/use-fetch', () => ({
  useFetch: vi.fn(),
}));

vi.mock('@/components/loader/loader', () => ({
  default: () => <div data-testid="loader" />,
}));

vi.mock('./ui/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('CharacterDetails Component', () => {
  const mockOnClose = vi.fn();

  const mockCharacter = {
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    type: '',
    image: 'rick.png',
    origin: { name: 'Earth' },
    location: { name: 'Citadel of Ricks' },
  };

  const setup = (fetchState: {
    data: unknown;
    isLoading: boolean;
    error: string | null;
  }) => {
    vi.mocked(useFetch).mockReturnValue(fetchState);
    return render(<CharacterDetails />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('details=1'),
      vi.fn(),
    ]);
    vi.mocked(useOutletContext).mockReturnValue({ onClose: mockOnClose });
  });

  test('Should render loader when data is loading', () => {
    setup({ data: null, isLoading: true, error: null });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('Should render character details correctly and responds to close button', async () => {
    setup({ data: mockCharacter, isLoading: false, error: null });

    expect(
      screen.getByRole('heading', { name: 'Rick Sanchez', level: 2 })
    ).toBeInTheDocument();

    const expectedTexts = [
      'status',
      'Alive',
      'last location',
      'Citadel of Ricks',
      'Unknown',
    ];
    expectedTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    const closeBtn = screen.getByRole('button', { name: 'x' });

    await userEvent.click(closeBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
