import { http, HttpResponse } from 'msw';

import { CHARACTER_URL } from '@/constants/api-url';

import { mockCharacters } from '../mocks/mock-characters';
import { mockResponse } from '../mocks/mock-response';

export const handlers = [
  http.get(`${CHARACTER_URL}*`, ({ request }) => {
    const url = new URL(request.url);
    const nameFilter = url.searchParams.get('name');

    if (nameFilter) {
      const filteredResults = mockCharacters.filter((character) =>
        character.name.toLowerCase().includes(nameFilter.toLowerCase())
      );

      return HttpResponse.json({
        ...mockResponse,
        results: filteredResults,
        info: { ...mockResponse.info, count: filteredResults.length },
      });
    }

    return HttpResponse.json(mockResponse);
  }),
];
