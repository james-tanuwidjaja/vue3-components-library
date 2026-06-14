<template>
  <DocPage
    eyebrow="Selection controls"
    title="Checkbox"
    lead="A boolean input with the shared field behaviour (rules, error-below, loading)."
  >
    <DocExample :component="Basic" :source="BasicSrc" title="Basic usage" />
    <p>
      For a "must be checked" rule use
      <code>(v) =&gt; v || 'message'</code>
      — the
      <code>required()</code>
      helper treats
      <code>false</code>
      as a valid value.
    </p>
    <DocApiTable title="Props" :rows="apiProps" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/checkbox/Basic.vue';
import BasicSrc from '../../examples/checkbox/Basic.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'modelValue', type: 'boolean', default: 'false', description: 'Bound value (v-model).' },
  { name: 'label', type: 'string', description: 'Inline label (or default slot).' },
  { name: 'hint', type: 'string', description: 'Helper text.' },
  { name: 'rules', type: 'ValidationRule[]', description: 'Validation rules run on blur.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show a skeleton.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the checkbox.' },
];
</script>
