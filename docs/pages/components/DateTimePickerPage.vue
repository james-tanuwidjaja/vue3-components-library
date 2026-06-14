<template>
  <DocPage
    eyebrow="Pickers"
    title="Date Time Picker"
    lead="Like the date picker, but with time inputs and a confirm button. The model is a Date."
  >
    <DocExample
      :component="Basic"
      :source="BasicSrc"
      title="Basic usage"
      description="Pick a day and time, then press OK to commit."
    />
    <DocApiTable title="Props" :rows="apiProps" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/date-time-picker/Basic.vue';
import BasicSrc from '../../examples/date-time-picker/Basic.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'modelValue', type: 'Date | null', description: 'Bound value (v-model).' },
  {
    name: 'displayFormat',
    type: 'string',
    default: "'DD/MM/YYYY HH:mm'",
    description: 'Display format (moment-style).',
  },
  { name: 'min', type: 'Date | string', description: 'Earliest selectable date.' },
  { name: 'max', type: 'Date | string', description: 'Latest selectable date.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Show a clear button.' },
  { name: 'rules', type: 'ValidationRule[]', description: 'Validation rules.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show a skeleton.' },
];
</script>
