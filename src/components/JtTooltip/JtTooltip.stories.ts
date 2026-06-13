import type { Meta, StoryObj } from '@storybook/vue3-vite';

import JtTooltip from './JtTooltip.vue';
import JtButton from '../JtButton/JtButton.vue';

const meta: Meta<typeof JtTooltip> = {
  title: 'Components/JtTooltip',
  component: JtTooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
  args: { text: 'Helpful hint', placement: 'top' },
  render: (args) => ({
    components: { JtTooltip, JtButton },
    setup: () => ({ args }),
    template: `
      <div style="padding:3rem; display:flex; justify-content:center;">
        <JtTooltip v-bind="args">
          <JtButton variant="outlined">Hover me</JtButton>
        </JtTooltip>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof JtTooltip>;

export const Top: Story = {};
export const Bottom: Story = { args: { placement: 'bottom' } };
export const Right: Story = { args: { placement: 'right' } };
