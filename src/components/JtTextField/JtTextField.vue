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
        v-model="model"
        class="jt-field__input"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @blur="onBlur"
      />
      <slot name="append" />
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
    /** Bound value. */
    modelValue?: string | null;
    /** Field label. */
    label?: string;
    /** Placeholder text. */
    placeholder?: string;
    /** Helper text shown beneath the field when there is no error. */
    hint?: string;
    /** Native input type. */
    type?: string;
    /** Field name (keys the value in an enclosing form). */
    name?: string;
    /** Validation rules. */
    rules?: ValidationRule<string | null>[];
    /** Externally-supplied error message. */
    errorMessages?: string;
    /** Show the required indicator on the label. */
    required?: boolean;
    /** Show a skeleton placeholder instead of the control. */
    loading?: boolean;
    /** Disable the input. */
    disabled?: boolean;
    /** Make the input read-only. */
    readonly?: boolean;
    /** Vertical density. */
    density?: JtDensity;
  }>(),
  {
    modelValue: '',
    type: 'text',
    density: undefined,
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const inputId = useId();
const pick = useDefaults('JtTextField');
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
