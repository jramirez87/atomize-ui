import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const isCI = process.env.CI === 'true';

export default defineConfig({
  test: {
    reporters: isCI ? [['default', { summary: false }]] : ['verbose'],
    projects: [
      // Unit tests project
      {
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: './vitest.setup.ts',
          include: ['lib/**/*.test.ts', 'lib/**/*.test.tsx'],
          exclude: [
            '**/*.stories.*',
            '**/*.mdx',
            'node_modules',
            'dist',
            '.storybook/**',
          ],
        },
      },
      // Storybook-driven tests project
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
