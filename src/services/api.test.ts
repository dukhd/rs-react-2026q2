import { describe, expect, test } from 'vitest';

import { mockResponse } from '@/__tests__/mocks/mock-response';
import { errorHandlers } from '@/__tests__/msw/error-handlers';
import { server } from '@/__tests__/msw/server';
import { CHARACTER_URL } from '@/constants/api-url';
import { HttpError, ValidationError } from '@/types/errors';
import { areAllCharacters } from '@/types/guards/are-all-characters.guard';

import ApiService from './api';

describe('Api Service', () => {
  const apiService = new ApiService();
  const callGetCharacters = () =>
    apiService.getData(CHARACTER_URL, areAllCharacters);

  test('Should return data on success response and validation', async () => {
    const data = await callGetCharacters();
    expect(data).toEqual(mockResponse);
  });

  test('Should throw HttpError with 404 when no characters found', async () => {
    server.use(errorHandlers.notFound());
    const promise = callGetCharacters();
    await expect(promise).rejects.toThrow(HttpError);
    await expect(promise).rejects.toMatchObject({
      status: 404,
    });
  });

  test('Should throw HttpError on 500', async () => {
    server.use(errorHandlers.internalError());
    const promise = callGetCharacters();
    await expect(promise).rejects.toThrow(HttpError);
    await expect(promise).rejects.toMatchObject({
      status: 500,
    });
  });

  test('Should throw ValidationError if the response data fails validation', async () => {
    server.use(errorHandlers.validationError());
    await expect(callGetCharacters()).rejects.toThrow(ValidationError);
  });

  test('Should throw a network error when the connection fails', async () => {
    server.use(errorHandlers.networkError());
    await expect(callGetCharacters()).rejects.toThrow('Failed to fetch');
  });
});
