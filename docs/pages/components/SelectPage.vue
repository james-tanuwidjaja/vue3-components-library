<template>
  <DocPage
    eyebrow="Components"
    title="Select"
    lead="A searchable dropdown. The value can be any type, and the value/label keys are configurable."
  >
    <DocExample
      :component="Basic"
      :source="BasicSrc"
      title="Basic usage"
      description="Type to filter the options."
    />
    <DocExample
      :component="Multiple"
      :source="MultipleSrc"
      title="Multiple"
      description="Set `multiple` for an array model with removable chips."
    />
    <DocApiTable title="Props" :rows="apiProps" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/select/Basic.vue';
import BasicSrc from '../../examples/select/Basic.vue?raw';
import Multiple from '../../examples/select/Multiple.vue';
import MultipleSrc from '../../examples/select/Multiple.vue?raw';

const apiProps: ApiRow[] = [
  {
    name: 'modelValue',
    type: 'unknown',
    description: 'Selected value (any type); array when `multiple`.',
  },
  {
    name: 'items',
    type: 'unknown[]',
    default: '[]',
    description: 'Option list (primitives or objects).',
  },
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
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: 'Select multiple values (chips).',
  },
  {
    name: 'searchable',
    type: 'boolean',
    default: 'true',
    description: 'Filter options by typing.',
  },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Show a clear button.' },
  { name: 'rules', type: 'ValidationRule[]', description: 'Validation rules.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show a skeleton.' },
];
</script>
