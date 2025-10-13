import type { StorybookConfig } from '@storybook/react-vite';

const isCI = process.env.CI === 'true';

const config: StorybookConfig = {
  stories: ['../lib/**/*.mdx', '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    !isCI && '@storybook/addon-vitest',
    !isCI && 'storybook-addon-test-codegen',
  ].filter(Boolean) as string[],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      exclude: ['vite-plugin-dts'],
    };
    return config;
  },
};

export default config;
