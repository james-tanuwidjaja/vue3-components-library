<template>
  <DocPage
    eyebrow="Data"
    title="Smart Table"
    lead="Everything JtDataTable does, plus inline add / edit / delete with per-column validation."
  >
    <DocExample
      :component="Basic"
      :source="BasicSrc"
      title="Editable table"
      description="Use v-model:items, and/or listen to add / update / delete. Column rules validate each edit."
    />
    <DocApiTable title="Props" :rows="apiProps" />
    <DocApiTable title="Events" :rows="apiEvents" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/smart-table/Basic.vue';
import BasicSrc from '../../examples/smart-table/Basic.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'items', type: 'any[]', default: '[]', description: 'Row data (v-model:items).' },
  { name: 'columns', type: 'JtTableColumn[]', description: 'Columns; add `rules` and `editable`.' },
  { name: 'itemKey', type: 'string', default: "'id'", description: 'Stable row key property.' },
  { name: 'addable', type: 'boolean', default: 'true', description: 'Show the add button.' },
  { name: 'editable', type: 'boolean', default: 'true', description: 'Allow editing rows.' },
  { name: 'deletable', type: 'boolean', default: 'true', description: 'Allow deleting rows.' },
  { name: 'pageSize', type: 'number', default: '10', description: 'Rows per page.' },
];

const apiEvents: ApiRow[] = [
  { name: 'update:items', type: 'any[]', description: 'The updated list (v-model:items).' },
  { name: 'add', type: 'row', description: 'Emitted after a new row is saved.' },
  { name: 'update', type: 'row', description: 'Emitted after an existing row is saved.' },
  { name: 'delete', type: 'row', description: 'Emitted after a row is deleted.' },
];
</script>
