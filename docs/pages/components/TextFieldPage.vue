<template>
  <DocPage
    eyebrow="Components"
    title="Text Field"
    lead="A text input with label, hint, validation rules, and a loading skeleton."
  >
    <DocExample :component="Basic" :source="BasicSrc" title="Basic usage" />
    <DocExample
      :component="Validation"
      :source="ValidationSrc"
      title="Validation"
      description="Pass an array of rules; errors render below the field on blur."
    />
    <DocApiTable title="Props" :rows="apiProps" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/text-field/Basic.vue';
import BasicSrc from '../../examples/text-field/Basic.vue?raw';
import Validation from '../../examples/text-field/Validation.vue';
import ValidationSrc from '../../examples/text-field/Validation.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'modelValue', type: 'string | null', description: 'Bound value (v-model).' },
  { name: 'label', type: 'string', description: 'Field label.' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
  { name: 'hint', type: 'string', description: 'Helper text shown when there is no error.' },
  { name: 'type', type: 'string', default: "'text'", description: 'Native input type.' },
  { name: 'name', type: 'string', description: 'Field name (keys the value in a JtForm).' },
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
    description: 'Show a skeleton instead of the input.',
  },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input.' },
  {
    name: 'density',
    type: "'comfortable' | 'compact'",
    default: "'comfortable'",
    description: 'Vertical density.',
  },
];
</script>
