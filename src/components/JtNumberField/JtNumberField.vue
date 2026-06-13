<template>
  <JtFieldShell
    :label="label"
    :required="required"
    :for-id="inputId"
    :error="errorMessage"
    :hint="hint"
    :loading="loading"
  >
    <div class="jt-field__control" :class="controlClasses">
      <slot name="prepend" />
      <input
        :id="inputId"
        class="jt-field__input"
        type="number"
        inputmode="decimal"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        :value="displayValue"
        @input="onInput"
        @blur="onBlur"
      />
      <slot name="append" />
    </div>
  </JtFieldShell>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue';

import JtFieldShell from '../internal/JtFieldShell.vue';
import { useDefaults, useField } from '@/composables';
import type { JtDensity, ValidationRule } from '@/types';

const props = withDefaults(
  defineProps<{
    /** Bound numeric value (or `null` when empty). */
    modelValue?: number | null;
    label?: string;
    placeholder?: string;
    hint?: string;
    name?: string;
    min?: number;
    max?: number;
    step?: number;
    rules?: ValidationRule<number | null>[];
    errorMessages?: string;
    required?: boolean;
    loading?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    density?: JtDensity;
  }>(),
  {
    modelValue: null,
    step: 1,
    density: undefined,
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: number | null] }>();

const inputId = useId();
const pick = useDefaults('JtNumberField');
const density = computed(() => pick<JtDensity>('density', props.density, 'comfortable'));

const displayValue = ref(props.modelValue == null ? '' : String(props.modelValue));

watch(
  () => props.modelValue,
  (value) => {
    if (value == null) {
      if (displayValue.value !== '') displayValue.value = '';
    } else if (Number(displayValue.value) !== value) {
      displayValue.value = String(value);
    }
  },
);

function setValue(value: number | null): void {
  displayValue.value = value == null ? '' : String(value);
  emit('update:modelValue', value);
}

function onInput(event: Event): void {
  const raw = (event.target as HTMLInputElement).value;
  displayValue.value = raw;
  if (raw === '' || raw === '-') {
    emit('update:modelValue', null);
    return;
  }
  const parsed = Number(raw);
  emit('update:modelValue', Number.isNaN(parsed) ? null : parsed);
}

const { errorMessage, hasError, onBlur } = useField<number | null>({
  getValue: () => props.modelValue ?? null,
  setValue,
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
