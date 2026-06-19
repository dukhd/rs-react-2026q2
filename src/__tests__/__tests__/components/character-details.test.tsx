import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';
import CharacterDetails from '@/app/@details/character/[id]/page';

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
const mockHandleCloseDetails = vi.fn();

vi.mock('@/services/characters-api', () => ({
  useGetCharacterDetailsQuery: () => mockFetchResult,
}));

vi.mock('@/hooks/use-cache-refresh', () => ({
  useCacheRefresh: () => ({
    refreshDetails: mockRefreshDetails,
  }),
}));

vi.mock('@/hooks/use-details-sidebar', () => ({
  useDetailsSidebar: () => ({
    handleCloseDetails: mockHandleCloseDetails,
  }),
}));

vi.mock('@/components/loader/loader', () => ({
  default: () => <div data-testid="loader" />,
}));

vi.mock('@/components/ui/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <Image src={src} alt={alt} fill data-testid="character-image" />
  ),
}));

vi.mock('next/navigation', () => ({
  useParams: vi.fn(() => ({ id: '1' })),
}));

describe('CharacterDetails Component', () => {
  const setup = (fetchState: Partial<TestFetchState>, id = '1') => {
    mockFetchResult = {
      ...defaultState,
      ...fetchState,
    };
    vi.mocked(useParams).mockReturnValue({ id });
    return render(<CharacterDetails />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchResult = { ...defaultState };
  });

  test('Should render loader when data is loading', () => {
    setup({ isLoading: true });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('Should render loader when data is fetching', () => {
    setup({ isFetching: true, data: mockCharacters[0] });

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

    expect(mockHandleCloseDetails).toHaveBeenCalledTimes(1);
  });

  test('Should render error message and respond to Close button on failure', async () => {
    setup({ error: { status: 500 } });

    expect(
      screen.getByText('Oops! Status 500. Please try again.')
    ).toBeInTheDocument();

    const errorCloseBtn = screen.getByRole('button', { name: 'Close' });
    await userEvent.click(errorCloseBtn);

    expect(mockHandleCloseDetails).toHaveBeenCalledTimes(1);
  });

  test('Should call refreshDetails with character id when Refresh button is clicked', async () => {
    setup({ data: mockCharacters[0] });

    const refreshBtn = screen.getByRole('button', { name: 'Refresh' });
    await userEvent.click(refreshBtn);

    expect(mockRefreshDetails).toHaveBeenCalledWith(1);
    expect(mockRefreshDetails).toHaveBeenCalledTimes(1);
  });

  test('Should fallback to id 0 and handle missing detailsId', () => {
    setup({ data: null, error: null }, '0');
    expect(screen.getByText('Character not found')).toBeInTheDocument();
  });
});
