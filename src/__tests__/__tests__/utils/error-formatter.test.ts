import { describe, expect, test } from 'vitest';

import { ValidationError } from '@/types/errors';
import { formatErrorMessage } from '@/utils/error-formatter';

describe('Error Formatter Logic', () => {
  test.each([
    {
      name: 'RTK Query 404 Error',
      error: { status: 404 },
      expected: 'No characters found. Try a different name.',
    },
    {
      name: 'RTK Query 500 Error',
      error: { status: 500, data: { error: 'Internal Server Error' } },
      expected: 'Oops! Internal Server Error. Please try again.',
    },
    {
      name: 'ValidationError',
      error: new ValidationError(),
      expected: 'Data validation failed.',
    },
    {
      name: 'System Fetch Error',
      error: { status: 'FETCH_ERROR' },
      expected: 'Network failure or API limit reached. Please try again later.',
    },
    {
      name: 'Generic Error',
      error: new Error('Some native error'),
      expected: 'Oops! Something went wrong. Please try again.',
    },
    {
      name: 'Unknown input (null)',
      error: null,
      expected: 'Oops! Something went wrong. Please try again.',
    },
    {
      name: 'RTK Query 400 Error with custom message',
      error: { status: 400, data: { error: 'Custom message' } },
      expected: 'Oops! Custom message. Please try again.',
    },
  ])(
    'getMessage should return correct string for $name',
    ({ error, expected }) => {
      expect(formatErrorMessage(error)).toBe(expected);
    }
  );
});

describe('Custom Error Construction', () => {
  test('ValidationError should have specific name and base message', () => {
    const error = new ValidationError();
    expect(error.name).toBe('ValidationError');
    expect(error.message).toContain('unexpected format');
  });
});
