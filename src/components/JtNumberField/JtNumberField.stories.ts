import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtNumberField from './JtNumberField.vue';
import { required, min } from '@/constants';

const meta: Meta<typeof JtNumberField> = {
  title: 'Components/JtNumberField',
  component: JtNumberField,
  tags: ['autodocs'],
  args: { label: 'Quantity', placeholder: '0' },
  render: (args) => ({
    components: { JtNumberField },
    setup() {
      const model = ref<number | null>(null);
      return { args, model };
    },
    template: `<div style="max-width:16rem;"><JtNumberField v-bind="args" v-model="model" /><p style="font-size:0.75rem;">value: {{ model }}</p></div>`,
  }),
};

export default meta;
type Story = StoryObj<typeof JtNumberField>;

export const Default: Story = {};
export const WithRange: Story = { args: { label: 'Age', min: 0, max: 120 } };
export const Required: Story = { args: { required: true, rules: [required(), min(1)] } };
export const Loading: Story = { args: { loading: true } };
