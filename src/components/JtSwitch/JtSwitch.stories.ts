import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtSwitch from './JtSwitch.vue';

const meta: Meta<typeof JtSwitch> = {
  title: 'Components/JtSwitch',
  component: JtSwitch,
  tags: ['autodocs'],
  args: { label: 'Enable notifications' },
  render: (args) => ({
    components: { JtSwitch },
    setup() {
      const model = ref(false);
      return { args, model };
    },
    template: `<JtSwitch v-bind="args" v-model="model" /> <span style="font-size:0.75rem;">({{ model }})</span>`,
  }),
};

export default meta;
type Story = StoryObj<typeof JtSwitch>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
