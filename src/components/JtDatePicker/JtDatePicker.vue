<template>
  <JtFieldShell
    :label="label"
    :required="required"
    :for-id="inputId"
    :error="errorMessage"
    :hint="hint"
    :loading="loading"
  >
    <JtPopover v-model:open="open" placement="bottom-start" :match-width="false">
      <template #reference>
        <div
          class="jt-field__control jt-field__control--clickable"
          :class="controlClasses"
          :tabindex="disabled ? -1 : 0"
          @click="toggle"
          @keydown.enter.prevent="toggle"
        >
          <span class="jt-field__trigger-value" :class="{ 'jt-field__placeholder': !displayText }">
            {{ displayText || placeholder }}
          </span>

          <button
            v-if="clearable && hasValue && !disabled"
            type="button"
            class="jt-calendar__nav"
            aria-label="Clear"
            @click.stop="clear"
          >
            &times;
          </button>

          <svg
            class="jt-field__chevron"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </div>
      </template>

      <JtCalendar
        :model-value="selectedDate"
        :min="minDate"
        :max="maxDate"
        @update:model-value="onSelect"
      />
    </JtPopover>
  </JtFieldShell>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue';

import JtFieldShell from '../internal/JtFieldShell.vue';
import JtPopover from '../internal/JtPopover.vue';
import JtCalendar from '../internal/JtCalendar.vue';
import { useDefaults, useField, useJtConfig } from '@/composables';
import { formatDate, formatISODate, parseISODate } from '@/utils';
import type { JtDensity, ValidationRule } from '@/types';

const props = withDefaults(
  defineProps<{
    /** Primary value: `YYYY-MM-DD` string (or `null`). */
    modelValue?: string | null;
    /** Secondary value: the formatted display string (e.g. `DD/MM/YYYY`). */
    formatted?: string;
    /** Display format (moment-style tokens). Defaults to the plugin locale. */
    displayFormat?: string;
    min?: Date | string;
    max?: Date | string;
    label?: string;
    placeholder?: string;
    hint?: string;
    name?: string;
    clearable?: boolean;
    rules?: ValidationRule<string | null>[];
    errorMessages?: string;
    required?: boolean;
    loading?: boolean;
    disabled?: boolean;
    density?: JtDensity;
  }>(),
  {
    modelValue: null,
    density: undefined,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string | null];
  'update:formatted': [value: string];
}>();

const inputId = useId();
const config = useJtConfig();
const pick = useDefaults('JtDatePicker');
const density = computed(() => pick<JtDensity>('density', props.density, 'comfortable'));
const displayFormat = computed(() => props.displayFormat ?? config.locale.dateFormat);

const open = ref(false);

const selectedDate = computed(() => parseISODate(props.modelValue));
const displayText = computed(() =>
  selectedDate.value ? formatDate(selectedDate.value, displayFormat.value) : '',
);
const hasValue = computed(() => !!props.modelValue);

const normalize = (value?: Date | string): Date | undefined => {
  if (!value) return undefined;
  return typeof value === 'string' ? (parseISODate(value) ?? undefined) : value;
};
const minDate = computed(() => normalize(props.min));
const maxDate = computed(() => normalize(props.max));

const { errorMessage, hasError, onBlur } = useField<string | null>({
  getValue: () => props.modelValue ?? null,
  setValue: (value) => emit('update:modelValue', value),
  rules: () => props.rules,
  name: () => props.name,
  errorMessage: () => props.errorMessages,
});

function toggle(): void {
  if (props.disabled) return;
  open.value = !open.value;
}

function onSelect(date: Date): void {
  // Date is committed immediately, no confirmation.
  emit('update:modelValue', formatISODate(date));
  emit('update:formatted', formatDate(date, displayFormat.value));
  open.value = false;
}

function clear(): void {
  emit('update:modelValue', null);
  emit('update:formatted', '');
}

// Keep the formatted model in sync when the value changes externally.
watch(displayText, (value) => emit('update:formatted', value));

watch(open, (isOpen) => {
  if (!isOpen) onBlur();
});

const controlClasses = computed(() => [
  `jt-field__control--${density.value}`,
  {
    'jt-field__control--error': hasError.value,
    'jt-field__control--disabled': props.disabled,
  },
]);
</script>
