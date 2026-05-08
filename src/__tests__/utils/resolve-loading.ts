import { act } from '@testing-library/react';
import { vi } from 'vitest';

export const resolveLoading = async () => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(300);
  });
};
