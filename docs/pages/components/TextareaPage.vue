<template>
  <DocPage
    eyebrow="Form inputs"
    title="Textarea"
    lead="A multiline text input that shares the field API with JtTextField, plus rows."
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

import Basic from '../../examples/textarea/Basic.vue';
import BasicSrc from '../../examples/textarea/Basic.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'modelValue', type: 'string | null', description: 'Bound value (v-model).' },
  { name: 'label', type: 'string', description: 'Field label.' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
  { name: 'hint', type: 'string', description: 'Helper text shown when there is no error.' },
  { name: 'rows', type: 'number', default: '3', description: 'Visible rows.' },
  { name: 'rules', type: 'ValidationRule[]', description: 'Validation rules run on blur.' },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Show the required indicator.',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Show a skeleton instead of the control.',
  },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the textarea.' },
];
</script>
