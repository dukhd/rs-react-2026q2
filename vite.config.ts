/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    minify: true,
    target: 'esnext',
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [tailwindcss(), react()],
  test: {
    exclude: ['node_modules', 'dist'],
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
        'src/main.tsx',
        'src/App.tsx',
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
