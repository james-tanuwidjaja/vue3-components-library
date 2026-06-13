import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtCheckbox from './JtCheckbox.vue';

const meta: Meta<typeof JtCheckbox> = {
  title: 'Components/JtCheckbox',
  component: JtCheckbox,
  tags: ['autodocs'],
  args: { label: 'I accept the terms' },
  render: (args) => ({
    components: { JtCheckbox },
    setup() {
      const model = ref(false);
      return { args, model };
    },
    template: `<JtCheckbox v-bind="args" v-model="model" />`,
  }),
};

export default meta;
type Story = StoryObj<typeof JtCheckbox>;

export const Default: Story = {};
export const Checked: Story = {
  render: (args) => ({
    components: { JtCheckbox },
    setup: () => ({ args, model: ref(true) }),
    template: `<JtCheckbox v-bind="args" v-model="model" />`,
  }),
};
export const WithError: Story = {
  args: { rules: [(v: boolean) => v || 'You must accept to continue'] },
};
export const Loading: Story = { args: { loading: true } };
