<template>
  <header class="jt-header">
    <button
      v-if="showToggle"
      type="button"
      class="jt-header__toggle"
      aria-label="Toggle sidebar"
      @click="onToggle"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    </button>

    <div v-if="hasBrand" class="jt-header__brand">
      <slot v-if="collapsed && $slots.submark" name="submark" />
      <slot v-else name="brand" />
    </div>

    <span v-if="title" class="jt-header__title">{{ title }}</span>

    <div class="jt-header__center"><slot /></div>

    <div v-if="$slots.actions" class="jt-header__actions"><slot name="actions" /></div>
  </header>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

import { useJtLayout } from '@/composables';

const props = withDefaults(
  defineProps<{
    title?: string;
    /** Show the built-in hamburger toggle button. */
    showToggle?: boolean;
    /** Collapsed state when used standalone (outside JtLayout). Supports `v-model:collapsed`. */
    collapsed?: boolean;
  }>(),
  { showToggle: true, collapsed: undefined },
);

const emit = defineEmits<{ 'update:collapsed': [value: boolean]; toggle: [] }>();

const layout = useJtLayout();
const slots = useSlots();

const collapsed = computed(() => (layout ? layout.collapsed.value : (props.collapsed ?? false)));
const hasBrand = computed(() => !!slots.brand || !!slots.submark);

function onToggle(): void {
  if (layout) layout.toggle();
  else emit('update:collapsed', !(props.collapsed ?? false));
  emit('toggle');
}
</script>
