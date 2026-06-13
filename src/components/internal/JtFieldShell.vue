<template>
  <div class="jt-field">
    <label v-if="label" :for="forId" class="jt-field__label">
      {{ label }}
      <span v-if="required" class="jt-field__required" aria-hidden="true">*</span>
    </label>

    <JtSkeleton v-if="loading" :height="skeletonHeight" />
    <slot v-else />

    <p
      v-if="error || hint"
      class="jt-field__message"
      :class="{ 'jt-field__message--error': !!error }"
      role="alert"
    >
      {{ error || hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import JtSkeleton from '../JtSkeleton/JtSkeleton.vue';

withDefaults(
  defineProps<{
    /** Field label. */
    label?: string;
    /** Marks the label with a required indicator. */
    required?: boolean;
    /** `for` attribute target / control id. */
    forId?: string;
    /** Error message shown beneath the control (red). */
    error?: string;
    /** Hint shown beneath the control when there is no error. */
    hint?: string;
    /** Replace the control with a skeleton placeholder. */
    loading?: boolean;
    /** Height of the skeleton placeholder. */
    skeletonHeight?: string;
  }>(),
  { skeletonHeight: '2.375rem' },
);
</script>
