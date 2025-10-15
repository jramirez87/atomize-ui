import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const storybookBuild = process.env.STORYBOOK_BUILD === 'true';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    !storybookBuild && dts({ rollupTypes: true }),
  ].filter(Boolean),
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'AtomizeUIReact',
      fileName: format => (format === 'es' ? 'index.js' : 'index.cjs'),
      cssFileName: 'style',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});
