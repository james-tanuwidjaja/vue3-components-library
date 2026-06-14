<template>
  <DocPage
    eyebrow="Guides"
    title="Forms"
    lead="JtForm collects fields by name, runs validation rules, resets to initial values, and detects changes."
  >
    <p>
      Give each field a
      <code>name</code>
      and
      <code>rules</code>
      . The form auto-registers them.
      <code>initialValues</code>
      drives both
      <code>reset()</code>
      and the
      <code>isDirty</code>
      flag — empty for create, the loaded record for edit.
    </p>

    <DocExample
      :component="FormDemo"
      :source="FormDemoSrc"
      title="Create form with validation & dirty detection"
    />

    <DocExample
      :component="EditFormDemo"
      :source="EditFormDemoSrc"
      title="Edit form (load data + dirty check)"
      description="Fetch data first, then anchor the form's initial state — isDirty only becomes true after the user changes something. Save re-anchors the baseline so dirty resets after a successful submit."
    />

    <h2>Validation rules</h2>
    <p>
      Rule factories return
      <code>(value) =&gt; true | string</code>
      . Compose the built-ins or write your own:
    </p>
    <DocCode :code="rulesCode" lang="typescript" />

    <h2>Exposed API</h2>
    <DocApiTable title="JtForm (slot props & ref)" :rows="api" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocCode from '../../components/DocCode.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import FormDemo from '../../examples/form/FormDemo.vue';
import FormDemoSrc from '../../examples/form/FormDemo.vue?raw';

import EditFormDemo from '../../examples/form/EditFormDemo.vue';
import EditFormDemoSrc from '../../examples/form/EditFormDemo.vue?raw';

const rulesCode = `import { required, minLength, email, numeric, min } from '@james-tanuwidjaja/vue3-components';

const nameRules = [required('Name is required'), minLength(2)];
const ageRules = [required(), numeric(), min(18, 'Must be 18+')];

// custom rule
const noSpaces = (v: string) => !/\\s/.test(v) || 'No spaces allowed';`;

const api: ApiRow[] = [
  {
    name: 'initialValues',
    type: 'Record<string, unknown>',
    default: '{}',
    description: 'Initial values, keyed by field name.',
  },
  { name: 'validate()', type: '() => boolean', description: 'Validate all fields; true if valid.' },
  { name: 'reset()', type: '() => void', description: 'Restore fields to initial values.' },
  {
    name: 'resetValidation()',
    type: '() => void',
    description: 'Clear validation without changing values.',
  },
  {
    name: 'isDirty',
    type: 'boolean',
    description: 'Whether any field differs from its initial value.',
  },
  { name: '@submit', type: '{ valid: boolean }', description: 'Emitted on native submit.' },
];
</script>
