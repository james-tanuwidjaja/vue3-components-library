import type { Meta, StoryObj } from '@storybook/vue3-vite';

import JtButton from './JtButton.vue';

const meta: Meta<typeof JtButton> = {
  title: 'Components/JtButton',
  component: JtButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'text'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
  },
  args: {
    variant: 'filled',
    size: 'md',
    block: false,
    loading: false,
    disabled: false,
  },
  render: (args) => ({
    components: { JtButton },
    setup: () => ({ args }),
    template: `<JtButton v-bind="args">Button</JtButton>`,
  }),
};

export default meta;
type Story = StoryObj<typeof JtButton>;

export const Filled: Story = {};
export const Outlined: Story = { args: { variant: 'outlined' } };
export const Text: Story = { args: { variant: 'text' } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Block: Story = { args: { block: true } };

export const Sizes: Story = {
  render: (args) => ({
    components: { JtButton },
    setup: () => ({ args }),
    template: `
      <div style="display:flex; gap:0.5rem; align-items:center;">
        <JtButton v-bind="args" size="sm">Small</JtButton>
        <JtButton v-bind="args" size="md">Medium</JtButton>
        <JtButton v-bind="args" size="lg">Large</JtButton>
      </div>
    `,
  }),
};
