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
      <slot name="prepend">
        <span v-if="prefix" class="jt-field__placeholder">{{ prefix }}</span>
      </slot>
      <input
        :id="inputId"
        class="jt-field__input"
        type="text"
        inputmode="decimal"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :value="displayValue"
        @input="onInput"
        @blur="onBlurFormat"
      />
      <slot name="append" />
    </div>
  </JtFieldShell>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue';

import JtFieldShell from '../internal/JtFieldShell.vue';
import { useDefaults, useField, useJtConfig } from '@/composables';
import { formatMoney } from '@/utils';
import type { JtDensity, ValidationRule } from '@/types';

const props = withDefaults(
  defineProps<{
    /** Bound raw numeric value (or `null`). The display is formatted with separators. */
    modelValue?: number | null;
    label?: string;
    placeholder?: string;
    hint?: string;
    name?: string;
    /** Optional leading symbol, e.g. '$' or 'Rp'. */
    prefix?: string;
    /** Thousands separator. Defaults to the plugin locale ('.'). */
    thousands?: string;
    /** Decimal separator. Defaults to the plugin locale (','). */
    decimal?: string;
    /** Decimal places. Defaults to the plugin locale (2). */
    precision?: number;
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
    density: undefined,
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: number | null] }>();

const inputId = useId();
const config = useJtConfig();
const pick = useDefaults('JtMoneyField');
const density = computed(() => pick<JtDensity>('density', props.density, 'comfortable'));

const separators = computed(() => ({
  thousands: props.thousands ?? config.locale.money.thousands,
  decimal: props.decimal ?? config.locale.money.decimal,
  precision: props.precision ?? config.locale.money.precision,
}));

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Format a raw input string live, preserving an in-progress decimal. */
function liveFormat(raw: string): { text: string; value: number | null } {
  const { thousands, decimal, precision } = separators.value;
  const negative = raw.trim().startsWith('-');
  const cleaned = raw.replace(new RegExp(`[^0-9${escapeRegExp(decimal)}]`, 'g'), '');
  const hasDecimal = cleaned.includes(decimal);
  const [rawInt = '', ...rest] = cleaned.split(decimal);

  const intDigits = rawInt.replace(/^0+(?=\d)/, '');
  const grouped = intDigits.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
  const decDigits = rest.join('').slice(0, precision);

  let text = grouped;
  if (hasDecimal) text = `${grouped || '0'}${decimal}${decDigits}`;
  if (negative && text !== '') text = `-${text}`;

  let value: number | null = null;
  if (text !== '' && text !== '-') {
    const numeric = `${negative ? '-' : ''}${intDigits || '0'}${decDigits ? '.' + decDigits : ''}`;
    const parsed = Number(numeric);
    value = Number.isNaN(parsed) ? null : parsed;
  }
  return { text, value };
}

const displayValue = ref(
  props.modelValue == null ? '' : formatMoney(props.modelValue, separators.value),
);

watch(
  () => props.modelValue,
  (value) => {
    const next = value == null ? '' : formatMoney(value, separators.value);
    // Avoid clobbering an in-progress decimal entry when the parsed value is unchanged.
    if (liveFormat(displayValue.value).value !== value) displayValue.value = next;
  },
);

function setValue(value: number | null): void {
  displayValue.value = value == null ? '' : formatMoney(value, separators.value);
  emit('update:modelValue', value);
}

const { errorMessage, hasError, onBlur } = useField<number | null>({
  getValue: () => props.modelValue ?? null,
  setValue,
  rules: () => props.rules,
  name: () => props.name,
  errorMessage: () => props.errorMessages,
});

function onInput(event: Event): void {
  const { text, value } = liveFormat((event.target as HTMLInputElement).value);
  displayValue.value = text;
  emit('update:modelValue', value);
}

function onBlurFormat(): void {
  if (props.modelValue != null)
    displayValue.value = formatMoney(props.modelValue, separators.value);
  onBlur();
}

const controlClasses = computed(() => [
  `jt-field__control--${density.value}`,
  {
    'jt-field__control--error': hasError.value,
    'jt-field__control--disabled': props.disabled,
  },
]);
</script>
