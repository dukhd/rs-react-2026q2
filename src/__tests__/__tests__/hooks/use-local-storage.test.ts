import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, test } from 'vitest';

import { STORAGE_KEYS } from '@/constants/storage-keys';

import useLocalStorage from '../../../hooks/use-local-storage';

describe('useLocalStorage', () => {
  const KEY = STORAGE_KEYS.SEARCH_TERM;
  const VALUE = 'test-value';

  test('Should save data to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, ''));
    act(() => {
      result.current[1](VALUE);
    });
    expect(localStorage.getItem(KEY)).toBe(VALUE);
  });

  test('Should retrieve data from localStorage', () => {
    localStorage.setItem(KEY, VALUE);
    const { result } = renderHook(() => useLocalStorage(KEY, ''));
    expect(result.current[0]).toBe(VALUE);
  });

  test('should return initial value if key does not exist', () => {
    const { result } = renderHook(() =>
      useLocalStorage('wrong_key', 'default')
    );
    expect(result.current[0]).toBe('default');
  });
});
