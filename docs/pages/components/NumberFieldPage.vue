<template>
  <DocPage
    eyebrow="Form inputs"
    title="Number Field"
    lead="A numeric input. The model is a number (or null), with optional min, max, and step."
  >
    <DocExample :component="Basic" :source="BasicSrc" title="Basic usage" />
    <DocApiTable title="Props" :rows="apiProps" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/number-field/Basic.vue';
import BasicSrc from '../../examples/number-field/Basic.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'modelValue', type: 'number | null', description: 'Bound value (v-model).' },
  { name: 'label', type: 'string', description: 'Field label.' },
  { name: 'min', type: 'number', description: 'Minimum value.' },
  { name: 'max', type: 'number', description: 'Maximum value.' },
  { name: 'step', type: 'number', default: '1', description: 'Step increment.' },
  { name: 'rules', type: 'ValidationRule[]', description: 'Validation rules.' },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Show the required indicator.',
  },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show a skeleton.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input.' },
];
</script>
