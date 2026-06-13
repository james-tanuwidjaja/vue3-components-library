<template>
  <JtFieldShell
    :label="label"
    :required="required"
    :error="errorMessage"
    :hint="hint"
    :loading="loading"
    skeleton-height="2rem"
  >
    <div class="jt-radio-group" :class="{ 'jt-radio-group--column': direction === 'vertical' }">
      <label
        v-for="(item, index) in items"
        :key="index"
        class="jt-choice"
        :class="{ 'jt-choice--disabled': disabled }"
      >
        <input
          class="jt-choice__input"
          type="radio"
          :name="groupName"
          :checked="isSelected(item)"
          :disabled="disabled"
          @change="select(item)"
          @blur="onBlur"
        />
        <span class="jt-choice__box jt-choice__box--radio">
          <span class="jt-choice__dot"></span>
        </span>
        <span>
          <slot name="option" :item="item" :label="resolveLabel(item)">
            {{ resolveLabel(item) }}
          </slot>
        </span>
      </label>
    </div>
  </JtFieldShell>
</template>

<script setup lang="ts">
import { useId } from 'vue';

import JtFieldShell from '../internal/JtFieldShell.vue';
import { useField } from '@/composables';
import { deepEqual } from '@/utils';
import type { ValidationRule } from '@/types';

const props = withDefaults(
  defineProps<{
    /** Selected value (any type). */
    modelValue?: unknown;
    items?: unknown[];
    itemValue?: string | ((item: any) => unknown);
    itemLabel?: string | ((item: any) => string);
    label?: string;
    hint?: string;
    name?: string;
    direction?: 'horizontal' | 'vertical';
    rules?: ValidationRule<any>[];
    errorMessages?: string;
    required?: boolean;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    items: () => [],
    itemValue: 'value',
    itemLabel: 'label',
    direction: 'horizontal',
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: unknown] }>();

const groupName = props.name ?? useId();

const isObject = (item: unknown): item is Record<string, unknown> =>
  typeof item === 'object' && item !== null;

function resolveValue(item: unknown): unknown {
  if (typeof props.itemValue === 'function') return props.itemValue(item);
  return isObject(item) ? item[props.itemValue] : item;
}

function resolveLabel(item: unknown): string {
  if (typeof props.itemLabel === 'function') return props.itemLabel(item);
  return isObject(item) ? String(item[props.itemLabel] ?? '') : String(item);
}

function isSelected(item: unknown): boolean {
  return deepEqual(resolveValue(item), props.modelValue);
}

function select(item: unknown): void {
  emit('update:modelValue', resolveValue(item));
}

const { errorMessage, onBlur } = useField<unknown>({
  getValue: () => props.modelValue,
  setValue: (value) => emit('update:modelValue', value),
  rules: () => props.rules,
  name: () => props.name,
  errorMessage: () => props.errorMessages,
});
</script>
