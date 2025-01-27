import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    server: 'bin/server.ts',
    index: 'src/index.ts',
    prompt: 'src/prompt.ts'
  },
  format: ['cjs', 'esm'],
  minify: true,
  noExternal: ['flatted'],
  sourcemap: true,
  splitting: false
});
