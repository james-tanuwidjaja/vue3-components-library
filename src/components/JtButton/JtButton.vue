<template>
  <button class="jt-btn" :class="classes" :type="type" :disabled="isDisabled" @click="onClick">
    <span v-if="loading" class="jt-spinner" aria-hidden="true"></span>
    <slot name="prepend" />
    <slot />
    <slot name="append" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useDefaults } from '@/composables';
import type { JtButtonVariant, JtSize } from '@/types';

const props = withDefaults(
  defineProps<{
    /** Visual style. */
    variant?: JtButtonVariant;
    /** Size. */
    size?: JtSize;
    /** Full-width button. */
    block?: boolean;
    /** Show a spinner and block interaction. */
    loading?: boolean;
    /** Disable the button. */
    disabled?: boolean;
    /** Native button type. */
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    variant: undefined,
    size: undefined,
    block: false,
    loading: false,
    disabled: false,
    type: 'button',
  },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const pick = useDefaults('JtButton');
const variant = computed(() => pick<JtButtonVariant>('variant', props.variant, 'filled'));
const size = computed(() => pick<JtSize>('size', props.size, 'md'));

const isDisabled = computed(() => props.disabled || props.loading);

const classes = computed(() => [
  `jt-btn--${variant.value}`,
  `jt-btn--${size.value}`,
  {
    'jt-btn--block': props.block,
    'jt-btn--disabled': isDisabled.value,
  },
]);

function onClick(event: MouseEvent): void {
  if (isDisabled.value) return;
  emit('click', event);
}
</script>
