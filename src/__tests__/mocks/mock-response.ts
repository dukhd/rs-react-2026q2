import type { AllCharactersSchema } from '@/types/interfaces';

import { mockCharacters } from './mock-characters';

export const mockResponse: AllCharactersSchema = {
  info: {
    count: 2,
    pages: 1,
    next: null,
    prev: null,
  },
  results: mockCharacters,
};
