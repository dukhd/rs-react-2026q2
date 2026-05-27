import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOutletContext, useSearchParams } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';

import CharacterDetails from './character-details';

interface TestFetchState {
  data: (typeof mockCharacters)[number] | null;
  isLoading: boolean;
  isFetching: boolean;
  error: { status: number; data?: string } | null;
}

const defaultState: TestFetchState = {
  data: null,
  isLoading: false,
  isFetching: false,
  error: null,
};

let mockFetchResult: TestFetchState = { ...defaultState };

const mockRefreshDetails = vi.fn();

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(),
  useOutletContext: vi.fn(),
}));

vi.mock('@/services/characters-api', () => ({
  useGetCharacterDetailsQuery: () => mockFetchResult,
}));

vi.mock('@/hooks/use-cache-refresh', () => ({
  useCacheRefresh: () => ({
    refreshDetails: mockRefreshDetails,
  }),
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

  const setup = (fetchState: Partial<TestFetchState>) => {
    mockFetchResult = {
      ...defaultState,
      ...fetchState,
    };
    return render(<CharacterDetails />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchResult = { ...defaultState };
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('details=1'),
      vi.fn(),
    ]);
    vi.mocked(useOutletContext).mockReturnValue({ onClose: mockOnClose });
  });

  test('Should render loader when data is loading', () => {
    setup({ isLoading: true });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('Should render loader when data is fetching', () => {
    setup({ isFetching: true });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('Should render character details correctly and responds to close button', async () => {
    setup({ data: mockCharacters[0] });

    expect(
      screen.getByRole('heading', { name: 'Rick Sanchez', level: 2 })
    ).toBeInTheDocument();

    const expectedTexts = [
      'status',
      'Alive',
      'last location',
      'Earth (Replacement Dimension)',
      'Unknown',
    ];
    expectedTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    const closeBtn = screen.getByRole('button', { name: 'x' });

    await userEvent.click(closeBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('Should render error message and respond to Close button on failure', async () => {
    setup({ error: { status: 500 } });

    expect(screen.getByText('Failed to load details')).toBeInTheDocument();

    const errorCloseBtn = screen.getByRole('button', { name: 'Close' });
    await userEvent.click(errorCloseBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('Should call refreshDetails with character id when Refresh button is clicked', async () => {
    setup({ data: mockCharacters[0] });

    const refreshBtn = screen.getByRole('button', { name: 'Refresh' });
    await userEvent.click(refreshBtn);

    expect(mockRefreshDetails).toHaveBeenCalledWith(1);
    expect(mockRefreshDetails).toHaveBeenCalledTimes(1);
  });

  test('Should fallback to id 0 and handle missing detailsId', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(''),
      vi.fn(),
    ]);

    setup({ data: null });
    expect(screen.getByText('Failed to load details')).toBeInTheDocument();
  });
});
