import { http, HttpResponse } from 'msw';

import { CHARACTER_URL } from '@/constants/api-url';

export const errorHandlers = {
  notFound: () =>
    http.get(CHARACTER_URL, () => new HttpResponse(null, { status: 404 })),

  internalError: () =>
    http.get(CHARACTER_URL, () => new HttpResponse(null, { status: 500 })),

  validationError: () =>
    http.get(CHARACTER_URL, () => {
      return HttpResponse.json({
        info: {
          count: 2,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [{ name: 'No ID here' }],
      });
    }),

  networkError: () => http.get(CHARACTER_URL, () => HttpResponse.error()),
};
