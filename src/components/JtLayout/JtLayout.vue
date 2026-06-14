<template>
  <div class="jt-layout" :class="{ 'jt-layout--footer-fixed': hasFixedFooter }">
    <div class="jt-layout__header"><slot name="header" /></div>
    <div class="jt-layout__sidebar"><slot name="sidebar" /></div>
    <main class="jt-layout__main">
      <slot />
      <!-- Static footer: flows after the content and scrolls with it. -->
      <div v-if="$slots.footer && !fixedFooter" class="jt-layout__footer jt-layout__footer--inline">
        <slot name="footer" />
      </div>
    </main>
    <!-- Fixed footer: pinned below the scrolling main area. -->
    <div v-if="hasFixedFooter" class="jt-layout__footer jt-layout__footer--fixed">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, toRef, useSlots } from 'vue';

import { JT_LAYOUT_KEY } from '@/constants';
import type { JtLayoutContext } from '@/types';

const props = withDefaults(
  defineProps<{
    /** Sidebar collapsed (rail) state. Supports `v-model:collapsed`; uncontrolled if omitted. */
    collapsed?: boolean;
    /** When collapsed, expand the rail on hover to reveal labels. */
    expandOnHover?: boolean;
    /**
     * Pin the `#footer` slot to the bottom of the viewport (always visible).
     * When `false` (default) the footer flows after the content and scrolls with it.
     */
    fixedFooter?: boolean;
  }>(),
  { collapsed: undefined, expandOnHover: false, fixedFooter: false },
);

const emit = defineEmits<{ 'update:collapsed': [value: boolean] }>();

const slots = useSlots();
const hasFixedFooter = computed(() => props.fixedFooter && !!slots.footer);

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
