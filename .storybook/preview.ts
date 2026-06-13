import type { Preview } from '@storybook/vue3-vite';
import { setup } from '@storybook/vue3-vite';

import { createJt } from '../src';

// Install the library so every story has the global components, config, and theme.
setup((app) => {
  app.use(createJt());
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
