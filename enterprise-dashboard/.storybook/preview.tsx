import type { Preview } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from '../src/app/store';
import { darkTheme } from '../src/styles/theme/muiTheme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0f1e' },
        { name: 'light', value: '#f8fafc' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Story />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export default preview;
