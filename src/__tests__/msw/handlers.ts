import { http, HttpResponse } from 'msw';

import { CHARACTER_URL } from '@/constants/api-url';

import { mockResponse } from '../mocks/mock-response';

export const handlers = [
  http.get(CHARACTER_URL, () => {
    return HttpResponse.json(mockResponse);
  }),
];
