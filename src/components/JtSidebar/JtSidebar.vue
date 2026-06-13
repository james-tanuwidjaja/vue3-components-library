<template>
  <aside
    class="jt-sidebar"
    :class="{ 'jt-sidebar--rail': isRail, 'jt-sidebar--hovered': hovered }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="jt-sidebar__inner">
      <div v-if="$slots.top" class="jt-sidebar__top"><slot name="top" /></div>

      <div class="jt-sidebar__menu">
        <slot>
          <JtSidebarMenu
            :items="items"
            :can-access="canAccess"
            :link-component="linkComponent"
            :current-path="currentPath"
            @select="emit('select', $event)"
          >
            <template v-if="$slots.icon" #icon="slotProps">
              <slot name="icon" v-bind="slotProps" />
            </template>
          </JtSidebarMenu>
        </slot>
      </div>

      <div v-if="$slots.bottom" class="jt-sidebar__bottom"><slot name="bottom" /></div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue';

import JtSidebarMenu from '../internal/JtSidebarMenu.vue';
import { useJtLayout } from '@/composables';
import type { JtCanAccess, JtMenuItem } from '@/types';

const props = withDefaults(
  defineProps<{
    /** Menu items for the middle section (or use the default slot for custom content). */
    items?: JtMenuItem[];
    /** Predicate that filters which items (and children) are shown. */
    canAccess?: JtCanAccess;
    /** Component used to render items that have `to` (e.g. RouterLink). Defaults to `'a'`. */
    linkComponent?: string | Component;
    /** Current route path, used to mark the active item. */
    currentPath?: string;
    /** Collapsed (rail) state when used standalone (outside JtLayout). */
    collapsed?: boolean;
    /** Expand the rail on hover when collapsed (standalone fallback). */
    expandOnHover?: boolean;
  }>(),
  { items: () => [], linkComponent: 'a', collapsed: undefined, expandOnHover: false },
);

const emit = defineEmits<{ select: [item: JtMenuItem] }>();

const layout = useJtLayout();
const hovered = ref(false);

const collapsed = computed(() => (layout ? layout.collapsed.value : (props.collapsed ?? false)));
const expandOnHover = computed(() => (layout ? layout.expandOnHover.value : props.expandOnHover));
const isRail = computed(() => collapsed.value);

function onEnter(): void {
  if (collapsed.value && expandOnHover.value) hovered.value = true;
}

function onLeave(): void {
  hovered.value = false;
}
</script>
