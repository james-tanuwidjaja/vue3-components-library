<template>
  <div class="jt-skeleton" :style="style" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /** Shape of the placeholder. */
    variant?: 'text' | 'rect' | 'circle';
    /** CSS width (number is treated as px). */
    width?: string | number;
    /** CSS height (number is treated as px). */
    height?: string | number;
    /** Override border radius. */
    rounded?: string;
  }>(),
  { variant: 'rect' },
);

const toCss = (value?: string | number): string | undefined =>
  typeof value === 'number' ? `${value}px` : value;

const style = computed(() => {
  const radius = props.rounded ?? (props.variant === 'circle' ? '9999px' : 'var(--radius-jt)');
  return {
    width: toCss(props.width),
    height: toCss(props.height) ?? (props.variant === 'text' ? '1em' : '100%'),
    borderRadius: props.variant === 'text' ? '0.25rem' : radius,
    display: 'block',
  };
});
</script>
