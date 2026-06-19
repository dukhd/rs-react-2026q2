import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    exclude: ['node_modules', '.next', 'dist'],
    ui: true,
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup-tests.ts',
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/app/manifest.json',
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/__tests__/*',
        'src/**/*.d.ts',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
