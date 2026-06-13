import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtDatePicker from './JtDatePicker.vue';

const meta: Meta<typeof JtDatePicker> = {
  title: 'Components/JtDatePicker',
  component: JtDatePicker,
  tags: ['autodocs'],
  args: { label: 'Birth date', placeholder: 'DD/MM/YYYY', clearable: true },
  render: (args) => ({
    components: { JtDatePicker },
    setup() {
      const iso = ref<string | null>(null);
      const formatted = ref('');
      return { args, iso, formatted };
    },
    template: `
      <div style="max-width:18rem;">
        <JtDatePicker v-bind="args" v-model="iso" v-model:formatted="formatted" />
        <p style="font-size:0.75rem;">modelValue: {{ iso }} · formatted: {{ formatted }}</p>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof JtDatePicker>;

export const Default: Story = {};
export const CustomFormat: Story = { args: { displayFormat: 'YYYY-MM-DD' } };
export const Loading: Story = { args: { loading: true } };
