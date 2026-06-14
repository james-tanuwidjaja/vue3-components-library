<template>
  <DocPage
    eyebrow="Pickers"
    title="Date Picker"
    lead="A calendar input. Clicking a day commits immediately (no confirm), with a dual v-model."
  >
    <DocExample
      :component="Basic"
      :source="BasicSrc"
      title="Basic usage"
      description="v-model is a YYYY-MM-DD string; v-model:formatted is the display string (DD/MM/YYYY by default)."
    />
    <DocApiTable title="Props" :rows="apiProps" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/date-picker/Basic.vue';
import BasicSrc from '../../examples/date-picker/Basic.vue?raw';

const apiProps: ApiRow[] = [
  {
    name: 'modelValue',
    type: 'string | null',
    description: 'Primary value: YYYY-MM-DD (v-model).',
  },
  {
    name: 'formatted',
    type: 'string',
    description: 'Secondary value: formatted display (v-model:formatted).',
  },
  {
    name: 'displayFormat',
    type: 'string',
    default: "'DD/MM/YYYY'",
    description: 'Display format (date tokens, e.g. DD/MM/YYYY).',
  },
  { name: 'min', type: 'Date | string', description: 'Earliest selectable date.' },
  { name: 'max', type: 'Date | string', description: 'Latest selectable date.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Show a clear button.' },
  { name: 'rules', type: 'ValidationRule[]', description: 'Validation rules.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show a skeleton.' },
];
</script>
