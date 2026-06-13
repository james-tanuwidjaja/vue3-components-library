import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtDateTimePicker from './JtDateTimePicker.vue';

const meta: Meta<typeof JtDateTimePicker> = {
  title: 'Components/JtDateTimePicker',
  component: JtDateTimePicker,
  tags: ['autodocs'],
  args: { label: 'Appointment', placeholder: 'DD/MM/YYYY HH:mm', clearable: true },
  render: (args) => ({
    components: { JtDateTimePicker },
    setup() {
      const model = ref<Date | null>(null);
      return { args, model };
    },
    template: `
      <div style="max-width:18rem;">
        <JtDateTimePicker v-bind="args" v-model="model" />
        <p style="font-size:0.75rem;">value: {{ model }}</p>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof JtDateTimePicker>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
