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
        :model-value="draft"
        :min="minDate"
        :max="maxDate"
        @update:model-value="onSelectDay"
      >
        <template #footer>
          <div class="jt-calendar__time">
            <input
              type="number"
              min="0"
              max="23"
              :value="pad(hours)"
              aria-label="Hours"
              @input="onHours"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              :value="pad(minutes)"
              aria-label="Minutes"
              @input="onMinutes"
            />
          </div>
          <div class="jt-calendar__footer">
            <JtButton size="sm" variant="text" @click="cancel">Cancel</JtButton>
            <JtButton size="sm" :disabled="!draft" @click="confirm">OK</JtButton>
          </div>
        </template>
      </JtCalendar>
    </JtPopover>
  </JtFieldShell>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue';

import JtFieldShell from '../internal/JtFieldShell.vue';
import JtPopover from '../internal/JtPopover.vue';
import JtCalendar from '../internal/JtCalendar.vue';
import JtButton from '../JtButton/JtButton.vue';
import { useDefaults, useField, useJtConfig } from '@/composables';
import { formatDate, parseISODate } from '@/utils';
import type { JtDensity, ValidationRule } from '@/types';

const props = withDefaults(
  defineProps<{
    /** Bound value (a `Date`, or `null`). */
    modelValue?: Date | null;
    /** Display format (date/time tokens). Defaults to the plugin locale dateTimeFormat. */
    displayFormat?: string;
    min?: Date | string;
    max?: Date | string;
    label?: string;
    placeholder?: string;
    hint?: string;
    name?: string;
    clearable?: boolean;
    rules?: ValidationRule<Date | null>[];
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

const emit = defineEmits<{ 'update:modelValue': [value: Date | null] }>();

const inputId = useId();
const config = useJtConfig();
const pick = useDefaults('JtDateTimePicker');
const density = computed(() => pick<JtDensity>('density', props.density, 'comfortable'));
const displayFormat = computed(() => props.displayFormat ?? config.locale.dateTimeFormat);

const open = ref(false);
const draft = ref<Date | null>(props.modelValue ?? null);
const hours = ref(props.modelValue?.getHours() ?? 0);
const minutes = ref(props.modelValue?.getMinutes() ?? 0);

const hasValue = computed(() => props.modelValue instanceof Date);
const displayText = computed(() =>
  props.modelValue ? formatDate(props.modelValue, displayFormat.value) : '',
);

const normalize = (value?: Date | string): Date | undefined => {
  if (!value) return undefined;
  return typeof value === 'string' ? (parseISODate(value) ?? undefined) : value;
};
const minDate = computed(() => normalize(props.min));
const maxDate = computed(() => normalize(props.max));

const pad = (value: number): string => String(value).padStart(2, '0');
const clamp = (value: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, Number.isNaN(value) ? lo : value));

function applyTime(): void {
  if (!draft.value) return;
  const next = new Date(draft.value);
  next.setHours(hours.value, minutes.value, 0, 0);
  draft.value = next;
}

function onSelectDay(date: Date): void {
  const next = new Date(date);
  next.setHours(hours.value, minutes.value, 0, 0);
  draft.value = next;
}

function onHours(event: Event): void {
  hours.value = clamp(Number((event.target as HTMLInputElement).value), 0, 23);
  applyTime();
}

function onMinutes(event: Event): void {
  minutes.value = clamp(Number((event.target as HTMLInputElement).value), 0, 59);
  applyTime();
}

const { errorMessage, hasError, onBlur } = useField<Date | null>({
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

function confirm(): void {
  if (draft.value) emit('update:modelValue', draft.value);
  open.value = false;
}

function cancel(): void {
  open.value = false;
}

function clear(): void {
  emit('update:modelValue', null);
}

watch(open, (isOpen) => {
  if (isOpen) {
    // Stage the current value (or now) as the editable draft.
    draft.value = props.modelValue ? new Date(props.modelValue) : null;
    const base = props.modelValue ?? new Date();
    hours.value = base.getHours();
    minutes.value = base.getMinutes();
  } else {
    onBlur();
  }
});

const controlClasses = computed(() => [
  `jt-field__control--${density.value}`,
  {
    'jt-field__control--error': hasError.value,
    'jt-field__control--disabled': props.disabled,
  },
]);
</script>
