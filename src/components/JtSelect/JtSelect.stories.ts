import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtSelect from './JtSelect.vue';
import { required } from '@/constants';

const countries = [
  { label: 'Indonesia', value: 'ID' },
  { label: 'Singapore', value: 'SG' },
  { label: 'Malaysia', value: 'MY' },
  { label: 'Japan', value: 'JP' },
  { label: 'United States', value: 'US' },
];

const meta: Meta<typeof JtSelect> = {
  title: 'Components/JtSelect',
  component: JtSelect,
  tags: ['autodocs'],
  args: { label: 'Country', placeholder: 'Select a country', items: countries },
  render: (args) => ({
    components: { JtSelect },
    setup() {
      const model = ref<unknown>(null);
      return { args, model };
    },
    template: `<div style="max-width:18rem;"><JtSelect v-bind="args" v-model="model" /><p style="font-size:0.75rem;">value: {{ model }}</p></div>`,
  }),
};

export default meta;
type Story = StoryObj<typeof JtSelect>;

export const Default: Story = {};
export const Clearable: Story = { args: { clearable: true } };
export const Required: Story = { args: { required: true, rules: [required('Please choose one')] } };
export const Loading: Story = { args: { loading: true } };
