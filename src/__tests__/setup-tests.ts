import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { server } from './msw/server';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

afterAll(() => server.close());
