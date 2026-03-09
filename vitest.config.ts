import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['app/lib/**/*.test.ts'],
    typecheck: {
      tsconfig: './tsconfig.json',
    },
  },
})
