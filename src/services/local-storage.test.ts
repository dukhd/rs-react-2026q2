import { describe, expect, test } from 'vitest';

import { STORAGE_KEYS } from '@/constants/storage-keys';

import localStorageService from './local-storage';

describe('Local Storage Service', () => {
  const KEY = STORAGE_KEYS.SEARCH_TERM;
  const VALUE = 'test-value';

  test('Should save data to localStorage', () => {
    localStorageService.save(KEY, VALUE);
    expect(localStorage.getItem(KEY)).toBe(VALUE);
  });

  test('Should retrieve data from localStorage', () => {
    localStorageService.save(KEY, VALUE);
    const result = localStorageService.get(KEY);
    expect(result).toBe(VALUE);
  });

  test('Should return null if the key does not exist', () => {
    const result = localStorageService.get('wrong_key');
    expect(result).toBeNull();
  });
});
