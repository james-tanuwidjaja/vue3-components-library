import type { Meta, StoryObj } from '@storybook/vue3-vite';

import JtDataTable from './JtDataTable.vue';
import type { JtTableColumn } from '@/types';

const columns: JtTableColumn[] = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'age', label: 'Age', type: 'number', align: 'right' },
  { key: 'joined', label: 'Joined', type: 'date' },
  {
    key: 'role',
    label: 'Role',
    type: 'select',
    items: [
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' },
    ],
  },
  { key: 'active', label: 'Active', type: 'boolean' },
];

const items = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: ['Alice', 'Bob', 'Carol', 'Dave', 'Erin'][i % 5] + ' ' + (i + 1),
  age: 20 + ((i * 7) % 40),
  joined: `20${20 + (i % 5)}-0${(i % 9) + 1}-1${i % 9}`,
  role: ['admin', 'editor', 'viewer'][i % 3],
  active: i % 2 === 0,
}));

const meta: Meta<typeof JtDataTable> = {
  title: 'Components/JtDataTable',
  component: JtDataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JtDataTable>;

export const Default: Story = {
  render: () => ({
    components: { JtDataTable },
    setup: () => ({ columns, items }),
    template: `<JtDataTable :columns="columns" :items="items" :page-size="5" />`,
  }),
};

export const WithActions: Story = {
  render: () => ({
    components: { JtDataTable },
    setup: () => ({ columns, items }),
    template: `
      <JtDataTable :columns="columns" :items="items" :page-size="5">
        <template #actions="{ row }">
          <button class="jt-pagination__btn" @click="alert('View ' + row.name)">👁</button>
        </template>
      </JtDataTable>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    components: { JtDataTable },
    setup: () => ({ columns, items }),
    template: `<JtDataTable :columns="columns" :items="items" loading :page-size="5" />`,
  }),
};
