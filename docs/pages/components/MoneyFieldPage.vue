<template>
  <DocPage
    eyebrow="Form inputs"
    title="Money Field"
    lead="Live thousand/decimal grouping. The model is the raw number; the display is formatted."
  >
    <DocExample
      :component="Basic"
      :source="BasicSrc"
      title="Basic usage"
      description="Separators default to the plugin locale ('.' / ','), and are overridable per field."
    />
    <DocApiTable title="Props" :rows="apiProps" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/money-field/Basic.vue';
import BasicSrc from '../../examples/money-field/Basic.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'modelValue', type: 'number | null', description: 'Bound raw value (v-model).' },
  { name: 'label', type: 'string', description: 'Field label.' },
  { name: 'prefix', type: 'string', description: 'Leading symbol, e.g. "$" or "Rp".' },
  {
    name: 'thousands',
    type: 'string',
    default: "'.'",
    description: 'Thousands separator (defaults to plugin locale).',
  },
  {
    name: 'decimal',
    type: 'string',
    default: "','",
    description: 'Decimal separator (defaults to plugin locale).',
  },
  { name: 'precision', type: 'number', default: '2', description: 'Decimal places.' },
  { name: 'rules', type: 'ValidationRule[]', description: 'Validation rules.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show a skeleton.' },
];
</script>
