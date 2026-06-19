import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { charactersApi } from '@/services/characters-api';

import { useAppDispatch } from '../../../hooks/store-hooks';
import { useCacheRefresh } from '../../../hooks/use-cache-refresh';

vi.mock('@/hooks/store-hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('@/services/characters-api', () => ({
  charactersApi: {
    util: {
      invalidateTags: vi.fn((tags) => ({
        type: 'TEST_TAGS',
        payload: tags,
      })),
    },
  },
}));

describe('useCacheRefresh', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  test('refreshPage should call dispatch with correct page and search tags', () => {
    const { result } = renderHook(() => useCacheRefresh());

    result.current.refreshPage(2, 'rick');

    expect(charactersApi.util.invalidateTags).toHaveBeenCalledWith([
      { type: 'Characters', id: 'RESULT-2-rick' },
    ]);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'TEST_TAGS',
      payload: [{ type: 'Characters', id: 'RESULT-2-rick' }],
    });
  });

  test('refreshDetails should call dispatch with correct character id tag', () => {
    const { result } = renderHook(() => useCacheRefresh());

    result.current.refreshDetails(3);

    expect(charactersApi.util.invalidateTags).toHaveBeenCalledWith([
      { type: 'Characters', id: 'DETAILS-3' },
    ]);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'TEST_TAGS',
      payload: [{ type: 'Characters', id: 'DETAILS-3' }],
    });
  });
});
