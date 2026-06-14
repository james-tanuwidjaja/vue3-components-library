<template>
  <div class="doc-api">
    <h2 v-if="title" class="doc-section__title">{{ title }}</h2>
    <JtDataTable
      :columns="columns"
      :items="mappedRows"
      :filterable="false"
      :pagination="false"
      item-key="name"
    >
      <template #name="{ value }">
        <code>{{ value }}</code>
      </template>
      <template #type="{ value }">
        <code class="doc-api__type">{{ value }}</code>
      </template>
      <template #defaultValue="{ value }">
        <code v-if="value" class="doc-api__default">{{ value }}</code>
        <span v-else class="doc-api__muted">—</span>
      </template>
    </JtDataTable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { JtDataTable } from '@james-tanuwidjaja/vue3-components';
import type { JtTableColumn } from '@james-tanuwidjaja/vue3-components';

import type { ApiRow } from '../types';

const props = defineProps<{ rows: ApiRow[]; title?: string }>();

// `default` is a reserved Vue slot name, so key the column as `defaultValue`.
const mappedRows = computed(() =>
  props.rows.map((row) => ({ ...row, defaultValue: row.default ?? '' })),
);

const columns: JtTableColumn[] = [
  { key: 'name', label: 'Name', width: '15rem' },
  { key: 'type', label: 'Type' },
  { key: 'defaultValue', label: 'Default', width: '9rem' },
  { key: 'description', label: 'Description' },
];
</script>
