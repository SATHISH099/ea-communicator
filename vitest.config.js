import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    coverage: {
      src: ['components', 'composables', 'layouts', 'middlewares', 'pages'],
      reporter: ['html', 'clover', 'lcovonly'],
      all: true,
    },
  },
});
