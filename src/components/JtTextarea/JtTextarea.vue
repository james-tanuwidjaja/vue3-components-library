<template>
  <JtFieldShell
    :label="label"
    :required="required"
    :for-id="inputId"
    :error="errorMessage"
    :hint="hint"
    :loading="loading"
    skeleton-height="4.5rem"
  >
    <div class="jt-field__control" :class="controlClasses">
      <textarea
        :id="inputId"
        v-model="model"
        class="jt-field__input"
        :name="name"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @blur="onBlur"
      ></textarea>
    </div>
  </JtFieldShell>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue';

import JtFieldShell from '../internal/JtFieldShell.vue';
import { useDefaults, useField } from '@/composables';
import type { JtDensity, ValidationRule } from '@/types';

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    label?: string;
    placeholder?: string;
    hint?: string;
    name?: string;
    rows?: number;
    rules?: ValidationRule<string>[];
    errorMessages?: string;
    required?: boolean;
    loading?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    density?: JtDensity;
  }>(),
  {
    modelValue: '',
    rows: 3,
    density: undefined,
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const inputId = useId();
const pick = useDefaults('JtTextarea');
const density = computed(() => pick<JtDensity>('density', props.density, 'comfortable'));

const model = computed<string>({
  get: () => props.modelValue ?? '',
  set: (value) => emit('update:modelValue', value),
});

const { errorMessage, hasError, onBlur } = useField<string>({
  getValue: () => model.value,
  setValue: (value) => emit('update:modelValue', value),
  rules: () => props.rules,
  name: () => props.name,
  errorMessage: () => props.errorMessages,
});

const controlClasses = computed(() => [
  `jt-field__control--${density.value}`,
  {
    'jt-field__control--error': hasError.value,
    'jt-field__control--disabled': props.disabled,
  },
]);
</script>
