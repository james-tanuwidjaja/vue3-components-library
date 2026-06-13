import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtTextarea from './JtTextarea.vue';
import { required } from '@/constants';

const meta: Meta<typeof JtTextarea> = {
  title: 'Components/JtTextarea',
  component: JtTextarea,
  tags: ['autodocs'],
  args: {
    label: 'Description',
    placeholder: 'Tell us more...',
    rows: 3,
  },
  render: (args) => ({
    components: { JtTextarea },
    setup() {
      const model = ref('');
      return { args, model };
    },
    template: `<div style="max-width:24rem;"><JtTextarea v-bind="args" v-model="model" /></div>`,
  }),
};

export default meta;
type Story = StoryObj<typeof JtTextarea>;

export const Default: Story = {};
export const Required: Story = { args: { required: true, rules: [required()] } };
export const Loading: Story = { args: { loading: true } };
