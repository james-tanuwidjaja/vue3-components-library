import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtTextField from './JtTextField.vue';
import { required, email } from '@/constants';

const meta: Meta<typeof JtTextField> = {
  title: 'Components/JtTextField',
  component: JtTextField,
  tags: ['autodocs'],
  argTypes: {
    density: { control: 'select', options: ['comfortable', 'compact'] },
  },
  args: {
    label: 'Full name',
    placeholder: 'Jane Doe',
  },
  render: (args) => ({
    components: { JtTextField },
    setup() {
      const model = ref('');
      return { args, model };
    },
    template: `<div style="max-width:20rem;"><JtTextField v-bind="args" v-model="model" /></div>`,
  }),
};

export default meta;
type Story = StoryObj<typeof JtTextField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'As it appears on your ID' },
};

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    required: true,
    rules: [required(), email()],
  },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true, modelValue: 'Read only value' },
};
