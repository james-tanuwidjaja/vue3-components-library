<template>
  <Teleport to="body">
    <!-- One overlay per stacked dialog; later dialogs render above earlier ones. -->
    <div
      v-for="(entry, index) in dialogStack"
      :key="entry.id"
      class="jt-dialog__overlay"
      :style="{ zIndex: baseZIndex + index }"
      @click.self="onBackdrop(entry)"
    >
      <JtDialogHost :entry="entry" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

import JtDialogHost from '../internal/JtDialogHost.vue';
import { dialogStack, closeDialog } from '@/composables';
import type { JtDialogEntry } from '@/types';

// Matches the `.jt-dialog__overlay` base z-index; each stacked dialog gets +1.
const baseZIndex = 70;

function onBackdrop(entry: JtDialogEntry): void {
  if (!entry.options.persistent) closeDialog(entry.id);
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Escape' || dialogStack.length === 0) return;
  const top = dialogStack[dialogStack.length - 1];
  if (!top.options.persistent) closeDialog(top.id);
}

onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>
