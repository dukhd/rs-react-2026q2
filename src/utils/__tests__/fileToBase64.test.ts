import { afterEach, describe, expect, test, vi } from 'vitest';

import { convertToBase64 } from '../fileToBase64';

describe('convertToBase64 utility', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Should successfully convert a File to a Base64 string', async () => {
    const file = new File(['react-test'], 'photo.png', { type: 'image/png' });
    const result = await convertToBase64(file);

    expect(result).toBeTypeOf('string');
    expect(result).toContain('data:image/png;base64,');
  });

  test('Should throw error for invalid file', async () => {
    await expect(convertToBase64({} as File)).rejects.toThrow();
  });
});
