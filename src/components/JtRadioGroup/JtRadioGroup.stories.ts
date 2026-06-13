import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtRadioGroup from './JtRadioGroup.vue';
import { required } from '@/constants';

const sizes = [
  { label: 'Small', value: 's' },
  { label: 'Medium', value: 'm' },
  { label: 'Large', value: 'l' },
];

const meta: Meta<typeof JtRadioGroup> = {
  title: 'Components/JtRadioGroup',
  component: JtRadioGroup,
  tags: ['autodocs'],
  args: { label: 'Size', items: sizes },
  render: (args) => ({
    components: { JtRadioGroup },
    setup() {
      const model = ref<unknown>(null);
      return { args, model };
    },
    template: `<JtRadioGroup v-bind="args" v-model="model" /><p style="font-size:0.75rem;">value: {{ model }}</p>`,
  }),
};

export default meta;
type Story = StoryObj<typeof JtRadioGroup>;

export const Horizontal: Story = {};
export const Vertical: Story = { args: { direction: 'vertical' } };
export const Required: Story = { args: { required: true, rules: [required('Pick a size')] } };
export const Loading: Story = { args: { loading: true } };
