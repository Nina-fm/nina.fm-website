import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['app/lib/**/*.test.ts'],
    typecheck: {
      tsconfig: './tsconfig.json',
    },
    coverage: {
      provider: 'v8',
      include: ['app/lib/**/*.ts'],
      exclude: ['app/lib/**/*.test.ts'],
      reporter: ['text', 'lcov'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
