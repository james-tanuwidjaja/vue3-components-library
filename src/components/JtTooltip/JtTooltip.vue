<template>
  <span
    ref="referenceRef"
    class="jt-tooltip__reference"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
  </span>

  <Teleport to="body">
    <div
      v-if="open && hasContent"
      ref="floatingRef"
      class="jt-tooltip__content"
      :style="floatingStyles"
      role="tooltip"
    >
      <slot name="content">{{ text }}</slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, toRef, useSlots } from 'vue';
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
  type Placement,
} from '@floating-ui/vue';

const props = withDefaults(
  defineProps<{
    text?: string;
    placement?: Placement;
    offset?: number;
    disabled?: boolean;
  }>(),
  {
    placement: 'top',
    offset: 6,
    disabled: false,
  },
);

const slots = useSlots();
const open = ref(false);
const referenceRef = ref<HTMLElement | null>(null);
const floatingRef = ref<HTMLElement | null>(null);

const hasContent = computed(() => !props.disabled && (!!props.text || !!slots.content));

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  open,
  placement: toRef(props, 'placement'),
  whileElementsMounted: autoUpdate,
  middleware: [offsetMiddleware(() => props.offset), flip({ padding: 8 }), shift({ padding: 8 })],
});

function show(): void {
  open.value = true;
}

function hide(): void {
  open.value = false;
}
</script>
