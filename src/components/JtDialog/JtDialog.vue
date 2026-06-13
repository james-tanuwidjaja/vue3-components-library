<template>
  <div class="jt-dialog" :style="{ maxWidth: width }" role="dialog" aria-modal="true">
    <div v-if="showHeader" class="jt-dialog__header">
      <div class="jt-dialog__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <button
        v-if="!hideClose"
        type="button"
        class="jt-dialog__close"
        aria-label="Close"
        @click="close"
      >
        &times;
      </button>
    </div>

    <div class="jt-dialog__body"><slot /></div>

    <div v-if="$slots.footer" class="jt-dialog__footer">
      <slot name="footer" :close="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, useSlots } from 'vue';

import { JT_DIALOG_KEY } from '@/constants';

const props = withDefaults(
  defineProps<{
    title?: string;
    /** Hide the header close (×) button. */
    hideClose?: boolean;
    /** Max width (CSS). */
    width?: string;
  }>(),
  { hideClose: false },
);

const emit = defineEmits<{ close: [] }>();

const slots = useSlots();
const dialog = inject(JT_DIALOG_KEY, null);

const showHeader = computed(() => !!props.title || !!slots.title || !props.hideClose);

/** Cancel-close: resolves the openDialog() promise with `undefined`. */
function close(): void {
  if (dialog) dialog.close(undefined);
  else emit('close');
}
</script>
