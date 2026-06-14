<template>
  <JtDataTable :columns="columns" :items="rows" :page-size="5" />
</template>

<script setup lang="ts">
import { JtDataTable } from '@james-tanuwidjaja/vue3-components';
import type { JtTableColumn } from '@james-tanuwidjaja/vue3-components';

const columns: JtTableColumn[] = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'age', label: 'Age', type: 'number' },
  { key: 'role', label: 'Role', type: 'select', items: roles() },
  { key: 'active', label: 'Active', type: 'boolean' },
];

function roles() {
  return [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ];
}

const rows = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: ['Alice', 'Bob', 'Carol', 'Dave', 'Erin'][i % 5] + ' ' + (i + 1),
  age: 22 + ((i * 5) % 35),
  role: ['admin', 'editor', 'viewer'][i % 3],
  active: i % 2 === 0,
}));
</script>
