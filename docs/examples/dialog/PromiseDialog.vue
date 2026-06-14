<template>
  <div class="doc-row">
    <JtButton @click="confirmDelete">Delete item</JtButton>
    <span style="font-size: 0.875rem">Result: {{ result }}</span>
    <!-- Mount once near your app root -->
    <JtDialogProvider />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue';

import {
  JtButton,
  JtDialog,
  JtDialogProvider,
  openDialog,
  useDialog,
} from '@james-tanuwidjaja/vue3-components';

const result = ref('—');

const ConfirmDialog = defineComponent({
  props: { message: { type: String, default: 'Are you sure?' } },
  setup(props) {
    const { close } = useDialog<boolean>();
    return () =>
      h(
        JtDialog,
        { title: 'Please confirm' },
        {
          default: () => props.message,
          footer: () => [
            h(JtButton, { variant: 'text', onClick: () => close(false) }, () => 'Cancel'),
            h(JtButton, { onClick: () => close(true) }, () => 'Delete'),
          ],
        },
      );
  },
});

async function confirmDelete(): Promise<void> {
  const ok = await openDialog<boolean>(ConfirmDialog, { message: 'Delete this item permanently?' });
  result.value = ok ? 'confirmed ✅' : 'cancelled ❌';
}
</script>
