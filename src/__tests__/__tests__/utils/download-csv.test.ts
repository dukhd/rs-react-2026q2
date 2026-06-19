import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';
import { downloadCharactersCSV } from '@/utils/download-csv';

describe('downloadCharactersCSV Utility', () => {
  beforeEach(() => {
    globalThis.URL.createObjectURL = vi.fn(() => 'mock-object-url');
    globalThis.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Should return early and do nothing if characters array is empty', () => {
    const appendSpy = vi.spyOn(document.body, 'appendChild');

    downloadCharactersCSV([]);

    expect(appendSpy).not.toHaveBeenCalled();
    expect(globalThis.URL.createObjectURL).not.toHaveBeenCalled();
  });

  test('should generate CSV content, create download link, click it, and clean up', () => {
    const appendSpy = vi.spyOn(document.body, 'appendChild');

    const mockLink = document.createElement('a');

    const clickSpy = vi.spyOn(mockLink, 'click');
    const removeSpy = vi.spyOn(mockLink, 'remove');

    vi.spyOn(document, 'createElement').mockReturnValue(mockLink);

    downloadCharactersCSV([mockCharacters[0]]);

    expect(globalThis.URL.createObjectURL).toHaveBeenCalled();

    expect(mockLink.href).toContain('mock-object-url');
    expect(mockLink.download).toBe('1_characters.csv');

    expect(appendSpy).toHaveBeenCalledWith(mockLink);
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();

    expect(globalThis.URL.revokeObjectURL).toHaveBeenCalledWith(
      'mock-object-url'
    );
  });
});
