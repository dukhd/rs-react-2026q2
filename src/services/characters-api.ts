import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/constants/api-url';
import { ValidationError } from '@/types/errors';
import { areAllCharacters } from '@/types/guards/are-all-characters.guard';
import { isCharacter } from '@/types/guards/is-character.guard';
import type { AllCharactersSchema, CharacterSchema } from '@/types/interfaces';

const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL) || 120;

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: CACHE_TTL,
  tagTypes: ['Characters'],
  endpoints: (build) => ({
    getCharacters: build.query<
      AllCharactersSchema,
      { page: number; searchTerm: string }
    >({
      query: ({ page, searchTerm }) => ({
        url: 'character/',
        params: { name: searchTerm, page },
      }),
      transformResponse: (response: unknown) => {
        if (!areAllCharacters(response)) {
          throw new ValidationError();
        }
        return response;
      },
      providesTags: (_result, _error, data) => [
        { type: 'Characters', id: `RESULT-${data.page}-${data.searchTerm}` },
      ],
    }),
    getCharacterDetails: build.query<CharacterSchema, number>({
      query: (id) => `character/${id}`,
      transformResponse: (response: unknown) => {
        if (!isCharacter(response)) {
          throw new ValidationError();
        }
        return response;
      },
      providesTags: (_result, _error, id) => [
        { type: 'Characters', id: `DETAILS-${id}` },
      ],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterDetailsQuery } =
  charactersApi;
