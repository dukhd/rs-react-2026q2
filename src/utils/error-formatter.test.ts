import { describe, expect, test } from 'vitest';

import { HttpError, ValidationError } from '@/types/errors';

import { formatErrorMessage } from './error-formatter';

describe('Error Formatter Logic', () => {
  test.each([
    {
      name: 'HttpError 404',
      error: new HttpError(404, 'Not Found'),
      expected: 'No characters found. Try a different name.',
    },
    {
      name: 'HttpError 500',
      error: new HttpError(500, 'Internal Server Error'),
      expected: 'Oops! Internal Server Error. Please try again.',
    },
    {
      name: 'ValidationError',
      error: new ValidationError(),
      expected: 'Data validation failed.',
    },
    {
      name: 'System Fetch Error',
      error: new Error('Failed to fetch'),
      expected: 'Network failure or API limit reached. Please try again later.',
    },
    {
      name: 'Generic Error',
      error: new Error('Custom message'),
      expected: 'Custom message',
    },
    {
      name: 'Unknown input (null)',
      error: null,
      expected: 'Oops! Something went wrong. Please try again.',
    },
  ])(
    'getMessage should return correct string for $name',
    ({ error, expected }) => {
      expect(formatErrorMessage(error)).toBe(expected);
    }
  );
});

describe('Custom Error Construction', () => {
  test('HttpError should correctly store status and format base message', () => {
    const error = new HttpError(403, 'Forbidden');
    expect(error.status).toBe(403);
    expect(error.message).toBe('HTTP Error 403: Forbidden');
  });

  test('HttpError should use fallback for empty statusText', () => {
    const error = new HttpError(502, '');
    expect(error.message).toBe('HTTP Error 502: Something went wrong');
  });

  test('ValidationError should have specific name and base message', () => {
    const error = new ValidationError();
    expect(error.name).toBe('ValidationError');
    expect(error.message).toContain('unexpected format');
  });
});
