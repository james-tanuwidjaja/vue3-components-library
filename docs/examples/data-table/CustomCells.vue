<template>
  <JtDataTable :columns="columns" :items="rows" :pagination="false" :filterable="false">
    <template #active="{ value }">
      <span :style="{ color: value ? '#16a34a' : '#dc2626' }">
        {{ value ? '● Active' : '○ Inactive' }}
      </span>
    </template>
    <template #actions="{ row }">
      <JtButton size="sm" variant="text" @click="selected = row.name">View</JtButton>
    </template>
  </JtDataTable>
  <p style="margin-top: 0.75rem; font-size: 0.8125rem; color: var(--color-jt-muted)">
    Last viewed: {{ selected || '—' }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtDataTable, JtButton } from '@james-tanuwidjaja/vue3-components';
import type { JtTableColumn } from '@james-tanuwidjaja/vue3-components';

const selected = ref('');

const columns: JtTableColumn[] = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'active', label: 'Status', type: 'boolean' },
];

const rows = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Carol', active: true },
];
</script>
