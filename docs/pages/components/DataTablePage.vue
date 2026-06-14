<template>
  <DocPage
    eyebrow="Components"
    title="Data Table"
    lead="Pass columns and items. Filtering adapts to each column type, with sorting and pagination."
  >
    <DocExample
      :component="Basic"
      :source="BasicSrc"
      title="Basic usage"
      description="Per-column filters (string, number, date, select, boolean), sortable headers, pagination."
    />
    <DocExample
      :component="CustomCells"
      :source="CustomCellsSrc"
      title="Custom cells & actions"
      description="A slot named after a column key customizes its cell; the actions slot adds a trailing column."
    />
    <DocApiTable title="Props" :rows="apiProps" />
    <DocApiTable title="Column (JtTableColumn)" :rows="apiColumn" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/data-table/Basic.vue';
import BasicSrc from '../../examples/data-table/Basic.vue?raw';
import CustomCells from '../../examples/data-table/CustomCells.vue';
import CustomCellsSrc from '../../examples/data-table/CustomCells.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'columns', type: 'JtTableColumn[]', description: 'Column definitions.' },
  { name: 'items', type: 'any[]', default: '[]', description: 'Row data.' },
  { name: 'itemKey', type: 'string', default: "'id'", description: 'Stable row key property.' },
  {
    name: 'filterable',
    type: 'boolean',
    default: 'true',
    description: 'Show the per-column filter row.',
  },
  { name: 'pagination', type: 'boolean', default: 'true', description: 'Enable pagination.' },
  { name: 'pageSize', type: 'number', default: '10', description: 'Rows per page.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show skeleton rows.' },
];

const apiColumn: ApiRow[] = [
  { name: 'key', type: 'string', description: 'Property key on the row.' },
  { name: 'label', type: 'string', description: 'Header text.' },
  {
    name: 'type',
    type: "'string' | 'number' | 'date' | 'boolean' | 'select'",
    default: "'string'",
    description: 'Drives the filter input and formatting.',
  },
  { name: 'sortable', type: 'boolean', default: 'true', description: 'Allow sorting this column.' },
  {
    name: 'filterable',
    type: 'boolean',
    default: 'true',
    description: 'Allow filtering this column.',
  },
  { name: 'items', type: 'unknown[]', description: "Options for type 'select'." },
  { name: 'format', type: '(value, row) => string', description: 'Custom display formatter.' },
];
</script>
