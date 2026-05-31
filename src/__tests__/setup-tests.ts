import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { charactersApi } from '@/services/characters-api';
import { store } from '@/store/store';

import { server } from './msw/server';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
  vi.useRealTimers();
  store.dispatch(charactersApi.util.resetApiState());
});

afterAll(() => server.close());
