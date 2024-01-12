import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'lib/index.ts',
      name: 'clean-calendar-js',
      fileName: (format) => `clean-calendar-js.${format}.js`,
    },
  },
  server: {
    port: 4202,
  },
});
