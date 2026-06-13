<template>
  <ul class="jt-menu">
    <li v-for="item in accessibleItems" :key="itemKey(item)" class="jt-menu__item">
      <component
        :is="resolveTag(item)"
        v-bind="resolveProps(item)"
        class="jt-menu__link"
        :class="{
          'jt-menu__link--active': isActive(item),
          'jt-menu__link--disabled': item.disabled,
        }"
        @click="onClick(item)"
      >
        <span class="jt-menu__icon">
          <slot name="icon" :item="item">
            <i v-if="typeof item.icon === 'string'" :class="item.icon"></i>
            <component :is="item.icon" v-else-if="item.icon" />
          </slot>
        </span>
        <span class="jt-menu__label">{{ item.label }}</span>
        <svg
          v-if="item.children?.length"
          class="jt-menu__arrow"
          :class="{ 'jt-menu__arrow--open': isOpen(item) }"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </component>

      <JtSidebarMenu
        v-if="item.children?.length && isOpen(item)"
        class="jt-menu__children"
        :items="item.children"
        :can-access="canAccess"
        :link-component="linkComponent"
        :current-path="currentPath"
        @select="emit('select', $event)"
      >
        <template v-if="$slots.icon" #icon="iconProps">
          <slot name="icon" :item="iconProps.item" />
        </template>
      </JtSidebarMenu>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Component } from 'vue';

import type { JtCanAccess, JtMenuItem } from '@/types';

defineOptions({ name: 'JtSidebarMenu' });

const props = defineProps<{
  items: JtMenuItem[];
  canAccess?: JtCanAccess;
  linkComponent?: string | Component;
  currentPath?: string;
}>();

const emit = defineEmits<{ select: [item: JtMenuItem] }>();

defineSlots<{ icon?: (props: { item: JtMenuItem }) => unknown }>();

const openKeys = ref<Set<string | number>>(new Set());

const itemKey = (item: JtMenuItem): string | number => item.key ?? item.label;

const accessibleItems = computed(() =>
  props.canAccess ? props.items.filter((item) => props.canAccess!(item)) : props.items,
);

function isActive(item: JtMenuItem): boolean {
  if (item.active === true) return true;
  if (props.currentPath == null) return false;
  if (typeof item.to === 'string' && item.to === props.currentPath) return true;
  return item.href === props.currentPath;
}

function hasActiveDescendant(item: JtMenuItem): boolean {
  if (isActive(item)) return true;
  return (item.children ?? []).some(hasActiveDescendant);
}

const isOpen = (item: JtMenuItem): boolean => openKeys.value.has(itemKey(item));

function toggleOpen(item: JtMenuItem): void {
  const next = new Set(openKeys.value);
  const key = itemKey(item);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  openKeys.value = next;
}

function resolveTag(item: JtMenuItem): string | Component {
  if (item.children?.length) return 'button';
  if (item.to != null) return props.linkComponent ?? 'a';
  if (item.href != null) return 'a';
  return 'button';
}

function resolveProps(item: JtMenuItem): Record<string, unknown> {
  if (item.children?.length) return { type: 'button' };
  if (item.to != null) {
    if (props.linkComponent && props.linkComponent !== 'a') return { to: item.to };
    return { href: typeof item.to === 'string' ? item.to : undefined };
  }
  if (item.href != null) return { href: item.href };
  return { type: 'button' };
}

function onClick(item: JtMenuItem): void {
  if (item.disabled) return;
  if (item.children?.length) {
    toggleOpen(item);
    return;
  }
  emit('select', item);
}

onMounted(() => {
  // Auto-open branches that contain the active item.
  for (const item of props.items) {
    if (item.children?.length && hasActiveDescendant(item)) {
      openKeys.value.add(itemKey(item));
    }
  }
});
</script>
