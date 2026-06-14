<template>
  <div>
    <JtSmartTable v-model:items="rows" :columns="columns" :page-size="5" />
    <p style="margin-top: 0.75rem; font-size: 0.8125rem; color: var(--color-jt-muted)">
      Add, edit, or delete rows — edits are validated against the column rules.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtSmartTable, required } from '@james-tanuwidjaja/vue3-components';
import type { JtTableColumn } from '@james-tanuwidjaja/vue3-components';

const columns: JtTableColumn[] = [
  { key: 'name', label: 'Name', type: 'string', rules: [required('Name is required')] },
  { key: 'age', label: 'Age', type: 'number' },
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

const rows = ref([
  { id: 1, name: 'Alice', age: 30, role: 'admin', active: true },
  { id: 2, name: 'Bob', age: 25, role: 'editor', active: false },
  { id: 3, name: 'Carol', age: 41, role: 'viewer', active: true },
]);
</script>
