import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    watch: false,
    coverage: {
      src: ['components', 'composables', 'layouts', 'middlewares', 'pages'],
      reporter: ['html', 'clover', 'lcovonly'],
      all: true,
    },
  },
});
