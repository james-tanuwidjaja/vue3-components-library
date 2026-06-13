<template>
  <div ref="referenceRef" class="jt-popover__reference">
    <slot name="reference" />
  </div>

  <Teleport to="body">
    <div v-if="open" ref="floatingRef" class="jt-popover__panel" :style="floatingStyles">
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
  size,
  type Placement,
} from '@floating-ui/vue';

import { useClickOutside } from '@/composables';

const props = withDefaults(
  defineProps<{
    open: boolean;
    placement?: Placement;
    offset?: number;
    /** Make the panel at least as wide as the reference element. */
    matchWidth?: boolean;
  }>(),
  {
    placement: 'bottom-start',
    offset: 4,
    matchWidth: true,
  },
);

const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const referenceRef = ref<HTMLElement | null>(null);
const floatingRef = ref<HTMLElement | null>(null);

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  open: toRef(props, 'open'),
  placement: toRef(props, 'placement'),
  whileElementsMounted: autoUpdate,
  middleware: [
    offsetMiddleware(() => props.offset),
    flip({ padding: 8 }),
    shift({ padding: 8 }),
    size({
      padding: 8,
      apply({ rects, elements, availableHeight }) {
        Object.assign(elements.floating.style, {
          maxHeight: `${Math.max(120, availableHeight)}px`,
          minWidth: props.matchWidth ? `${rects.reference.width}px` : '',
        });
      },
    }),
  ],
});

useClickOutside([referenceRef, floatingRef], () => {
  if (props.open) emit('update:open', false);
});
</script>
