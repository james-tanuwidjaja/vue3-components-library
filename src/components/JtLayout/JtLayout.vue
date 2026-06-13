<template>
  <div class="jt-layout">
    <div class="jt-layout__header"><slot name="header" /></div>
    <div class="jt-layout__sidebar"><slot name="sidebar" /></div>
    <main class="jt-layout__main"><slot /></main>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, toRef } from 'vue';

import { JT_LAYOUT_KEY } from '@/constants';
import type { JtLayoutContext } from '@/types';

const props = withDefaults(
  defineProps<{
    /** Sidebar collapsed (rail) state. Supports `v-model:collapsed`; uncontrolled if omitted. */
    collapsed?: boolean;
    /** When collapsed, expand the rail on hover to reveal labels. */
    expandOnHover?: boolean;
  }>(),
  { collapsed: undefined, expandOnHover: false },
);

const emit = defineEmits<{ 'update:collapsed': [value: boolean] }>();

const internalCollapsed = ref(false);
const collapsed = computed<boolean>({
  get: () => props.collapsed ?? internalCollapsed.value,
  set: (value) => {
    internalCollapsed.value = value;
    emit('update:collapsed', value);
  },
});

function setCollapsed(value: boolean): void {
  collapsed.value = value;
}

function toggle(): void {
  collapsed.value = !collapsed.value;
}

const context: JtLayoutContext = {
  collapsed,
  expandOnHover: toRef(props, 'expandOnHover'),
  toggle,
  setCollapsed,
};

provide(JT_LAYOUT_KEY, context);

defineExpose({ collapsed, toggle, setCollapsed });
</script>
