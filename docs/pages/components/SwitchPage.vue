<template>
  <DocPage
    eyebrow="Selection controls"
    title="Switch"
    lead="A toggle for boolean values — same field API as the checkbox, different presentation."
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

import Basic from '../../examples/switch/Basic.vue';
import BasicSrc from '../../examples/switch/Basic.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'modelValue', type: 'boolean', default: 'false', description: 'Bound value (v-model).' },
  { name: 'label', type: 'string', description: 'Inline label (or default slot).' },
  { name: 'hint', type: 'string', description: 'Helper text.' },
  { name: 'rules', type: 'ValidationRule[]', description: 'Validation rules.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show a skeleton.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the switch.' },
];
</script>
