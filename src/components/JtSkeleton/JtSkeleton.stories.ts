import type { Meta, StoryObj } from '@storybook/vue3-vite';

import JtSkeleton from './JtSkeleton.vue';

const meta: Meta<typeof JtSkeleton> = {
  title: 'Components/JtSkeleton',
  component: JtSkeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'rect', 'circle'] },
  },
};

export default meta;
type Story = StoryObj<typeof JtSkeleton>;

export const Text: Story = {
  args: { variant: 'text', width: '12rem' },
};

export const Rect: Story = {
  args: { variant: 'rect', width: '16rem', height: '6rem' },
};

export const Circle: Story = {
  args: { variant: 'circle', width: '3rem', height: '3rem' },
};

export const Composed: Story = {
  render: () => ({
    components: { JtSkeleton },
    template: `
      <div style="display:flex; gap:1rem; align-items:center; width:20rem;">
        <JtSkeleton variant="circle" width="3rem" height="3rem" />
        <div style="flex:1; display:flex; flex-direction:column; gap:0.5rem;">
          <JtSkeleton variant="text" width="80%" />
          <JtSkeleton variant="text" width="60%" />
        </div>
      </div>
    `,
  }),
};
