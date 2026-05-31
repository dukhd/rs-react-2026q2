import { http, HttpResponse } from 'msw';
import { describe, expect, test } from 'vitest';

import { mockCharacters } from '@/__tests__/mocks/mock-characters';
import { mockResponse } from '@/__tests__/mocks/mock-response';
import { errorHandlers } from '@/__tests__/msw/error-handlers';
import { server } from '@/__tests__/msw/server';
import { renderWithProviders } from '@/__tests__/utils/render-with-providers';
import { CHARACTER_URL } from '@/constants/api-url';

import { charactersApi } from './characters-api';

const DEFAULT_PARAMS = { page: 1, searchTerm: '' };
const setupStore = () => renderWithProviders(<div />).store;

describe('Characters API', () => {
  test('getCharacters should return character list on successful API call', async () => {
    const store = setupStore();

    const result = await store.dispatch(
      charactersApi.endpoints.getCharacters.initiate(DEFAULT_PARAMS)
    );

    expect(result.status).toBe('fulfilled');
    expect(result.data).toEqual(mockResponse);
  });

  test('getCharacterDetails should return single character data', async () => {
    const store = setupStore();
    const characterId = 1;

    server.use(
      http.get(`${CHARACTER_URL}/${characterId}`, () => {
        return HttpResponse.json(mockCharacters[0]);
      })
    );

    const result = await store.dispatch(
      charactersApi.endpoints.getCharacterDetails.initiate(characterId)
    );

    expect(result.status).toBe('fulfilled');
    expect(result.data).toEqual(mockCharacters[0]);
  });

  test('getCharacters should fail when response validation fails', async () => {
    const store = setupStore();
    server.use(errorHandlers.validationError());

    const result = await store.dispatch(
      charactersApi.endpoints.getCharacters.initiate(DEFAULT_PARAMS)
    );

    expect(result.status).toBe('rejected');
    expect(result.error).toBeDefined();
  });

  test('getCharacterDetails should fail when character validation fails', async () => {
    const store = setupStore();
    const characterId = 1;

    server.use(
      http.get(`${CHARACTER_URL}/${characterId}`, () => {
        return HttpResponse.json({ invalidKey: 'invalid data' });
      })
    );

    const result = await store.dispatch(
      charactersApi.endpoints.getCharacterDetails.initiate(characterId)
    );

    expect(result.status).toBe('rejected');
    expect(result.error).toBeDefined();
  });
});
