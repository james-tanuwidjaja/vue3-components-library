import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtMoneyField from './JtMoneyField.vue';

const meta: Meta<typeof JtMoneyField> = {
  title: 'Components/JtMoneyField',
  component: JtMoneyField,
  tags: ['autodocs'],
  args: { label: 'Amount', placeholder: '0,00', prefix: 'Rp' },
  render: (args) => ({
    components: { JtMoneyField },
    setup() {
      const model = ref<number | null>(1234567.5);
      return { args, model };
    },
    template: `<div style="max-width:18rem;"><JtMoneyField v-bind="args" v-model="model" /><p style="font-size:0.75rem;">raw value: {{ model }}</p></div>`,
  }),
};

export default meta;
type Story = StoryObj<typeof JtMoneyField>;

export const Default: Story = {};

/** Defaults are '.' thousands / ',' decimal — override per field. */
export const UsDollars: Story = {
  args: { prefix: '$', thousands: ',', decimal: '.' },
};

export const Loading: Story = { args: { loading: true } };
