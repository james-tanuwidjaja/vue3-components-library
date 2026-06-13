<template>
  <component :is="entry.component" v-bind="entry.props" />
</template>

<script setup lang="ts">
import { provide } from 'vue';

import { JT_DIALOG_KEY } from '@/constants';
import { closeDialog } from '@/composables';
import type { JtDialogEntry } from '@/types';

const props = defineProps<{ entry: JtDialogEntry }>();

// Provide this dialog's context so the rendered component can resolve via useDialog().
provide(JT_DIALOG_KEY, {
  id: props.entry.id,
  close: (value?: unknown) => closeDialog(props.entry.id, value),
});
</script>
