import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtSmartTable from './JtSmartTable.vue';
import { required } from '@/constants';
import type { JtTableColumn } from '@/types';

const columns: JtTableColumn[] = [
  { key: 'name', label: 'Name', type: 'string', rules: [required('Name is required')] },
  { key: 'age', label: 'Age', type: 'number', align: 'right' },
  {
    key: 'role',
    label: 'Role',
    type: 'select',
    items: [
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' },
    ],
    rules: [required('Pick a role')],
  },
  { key: 'active', label: 'Active', type: 'boolean' },
];

const meta: Meta<typeof JtSmartTable> = {
  title: 'Components/JtSmartTable',
  component: JtSmartTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JtSmartTable>;

export const Editable: Story = {
  render: () => ({
    components: { JtSmartTable },
    setup() {
      const rows = ref([
        { id: 1, name: 'Alice', age: 30, role: 'admin', active: true },
        { id: 2, name: 'Bob', age: 25, role: 'editor', active: false },
        { id: 3, name: 'Carol', age: 41, role: 'viewer', active: true },
      ]);
      let nextId = 4;
      const onAdd = (row: any) => {
        // Assign a real id once persisted.
        rows.value[rows.value.length - 1] = { ...row, id: nextId++ };
      };
      return { columns, rows, onAdd };
    },
    template: `
      <div>
        <JtSmartTable v-model:items="rows" :columns="columns" :page-size="5" @add="onAdd" />
        <pre style="font-size:0.7rem;">{{ rows }}</pre>
      </div>
    `,
  }),
};
