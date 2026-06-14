<template>
  <DocPage
    eyebrow="Selection controls"
    title="Radio Group"
    lead="Single choice from a list. The value can be any type, with configurable value/label keys."
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

import Basic from '../../examples/radio-group/Basic.vue';
import BasicSrc from '../../examples/radio-group/Basic.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'modelValue', type: 'unknown', description: 'Selected value (any type).' },
  { name: 'items', type: 'unknown[]', default: '[]', description: 'Option list.' },
  {
    name: 'itemValue',
    type: 'string | (item) => unknown',
    default: "'value'",
    description: "Key or getter for an item's value.",
  },
  {
    name: 'itemLabel',
    type: 'string | (item) => string',
    default: "'label'",
    description: "Key or getter for an item's label.",
  },
  {
    name: 'direction',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Layout direction.',
  },
  { name: 'rules', type: 'ValidationRule[]', description: 'Validation rules.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show a skeleton.' },
];
</script>
