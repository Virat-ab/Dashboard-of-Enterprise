import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
  viteFinalConfig: async (config) => {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      '@': path.resolve(__dirname, '../src'),
      '@app': path.resolve(__dirname, '../src/app'),
      '@features': path.resolve(__dirname, '../src/features'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@types': path.resolve(__dirname, '../src/types'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@pages': path.resolve(__dirname, '../src/pages'),
    };
    return config;
  },
};

export default config;
