<template>
  <DocPage
    eyebrow="Components"
    title="Dialog"
    lead="Promise-based dialogs: openDialog() returns a promise resolved from inside the dialog."
  >
    <p>
      Mount
      <code>&lt;JtDialogProvider /&gt;</code>
      once near your app root. Open a dialog component with
      <code>openDialog()</code>
      and resolve it via
      <code>useDialog().close(value)</code>
      . Unlike
      <code>vue3-promise-dialog</code>
      , dialogs can be
      <strong>stacked</strong>
      (opened from within another dialog).
    </p>

    <DocExample
      :component="PromiseDialog"
      :source="PromiseDialogSrc"
      title="Confirm dialog"
      description="Click delete, then confirm or cancel — the button resolves the awaited promise."
    />

    <h2>API</h2>
    <DocApiTable title="openDialog(component, props?, options?)" :rows="apiOpen" />
    <DocApiTable title="JtDialog props" :rows="apiDialog" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import PromiseDialog from '../../examples/dialog/PromiseDialog.vue';
import PromiseDialogSrc from '../../examples/dialog/PromiseDialog.vue?raw';

const apiOpen: ApiRow[] = [
  { name: 'component', type: 'Component', description: 'The dialog component to render.' },
  {
    name: 'props',
    type: 'Record<string, unknown>',
    default: '{}',
    description: 'Props passed to the component.',
  },
  {
    name: 'options.persistent',
    type: 'boolean',
    default: 'false',
    description: 'Disable backdrop/Escape close.',
  },
  {
    name: '(returns)',
    type: 'Promise<T>',
    description: 'Resolves with the value passed to close().',
  },
];

const apiDialog: ApiRow[] = [
  { name: 'title', type: 'string', description: 'Header title.' },
  {
    name: 'hideClose',
    type: 'boolean',
    default: 'false',
    description: 'Hide the header × button.',
  },
  { name: 'width', type: 'string', description: 'Max width (CSS).' },
];
</script>
