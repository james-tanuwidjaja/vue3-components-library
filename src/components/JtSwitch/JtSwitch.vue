<template>
  <div class="jt-field">
    <JtSkeleton v-if="loading" height="1.25rem" width="8rem" />
    <template v-else>
      <label class="jt-choice" :class="{ 'jt-choice--disabled': disabled }">
        <input
          :id="inputId"
          class="jt-choice__input"
          type="checkbox"
          role="switch"
          :name="name"
          :checked="modelValue"
          :disabled="disabled"
          @change="onChange"
          @blur="onBlur"
        />
        <span class="jt-switch__track">
          <span class="jt-switch__thumb"></span>
        </span>
        <span v-if="label || $slots.default">
          <slot>{{ label }}</slot>
        </span>
      </label>

      <p
        v-if="errorMessage || hint"
        class="jt-field__message"
        :class="{ 'jt-field__message--error': !!errorMessage }"
        role="alert"
      >
        {{ errorMessage || hint }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';

import JtSkeleton from '../JtSkeleton/JtSkeleton.vue';
import { useField } from '@/composables';
import type { ValidationRule } from '@/types';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
    hint?: string;
    name?: string;
    rules?: ValidationRule<boolean>[];
    errorMessages?: string;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  { modelValue: false },
);

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const inputId = useId();

function onChange(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).checked);
}

const { errorMessage, onBlur } = useField<boolean>({
  getValue: () => props.modelValue,
  setValue: (value) => emit('update:modelValue', value),
  rules: () => props.rules,
  name: () => props.name,
  errorMessage: () => props.errorMessages,
});
</script>
