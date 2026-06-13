<template>
  <JtFieldShell
    :label="label"
    :required="required"
    :for-id="inputId"
    :error="errorMessage"
    :hint="hint"
    :loading="loading"
  >
    <JtPopover v-model:open="open" placement="bottom-start">
      <template #reference>
        <div
          class="jt-field__control jt-field__control--clickable"
          :class="controlClasses"
          role="combobox"
          :aria-expanded="open"
          :tabindex="disabled ? -1 : 0"
          @click="toggle"
          @keydown="onKeydown"
        >
          <div v-if="multiple && selectedItems.length" class="jt-select__chips">
            <span v-for="(item, i) in selectedItems" :key="i" class="jt-chip">
              {{ resolveLabel(item) }}
              <button
                v-if="!disabled"
                type="button"
                class="jt-chip__remove"
                aria-label="Remove"
                @click.stop="selectItem(item)"
              >
                &times;
              </button>
            </span>
          </div>

          <input
            v-if="open && searchable"
            ref="searchRef"
            v-model="search"
            class="jt-select__search"
            :placeholder="searchPlaceholder"
            @click.stop
          />
          <span
            v-else-if="!multiple"
            class="jt-field__trigger-value"
            :class="{ 'jt-field__placeholder': !selectedLabel }"
          >
            {{ selectedLabel || placeholder }}
          </span>
          <span
            v-else-if="!selectedItems.length"
            class="jt-field__trigger-value jt-field__placeholder"
          >
            {{ placeholder }}
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
            :class="{ 'jt-field__chevron--open': open }"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </template>

      <ul class="jt-select__options" role="listbox">
        <li
          v-for="(item, index) in filteredItems"
          :key="index"
          class="jt-select__option"
          :class="{
            'jt-select__option--active': index === activeIndex,
            'jt-select__option--selected': isSelected(item),
          }"
          role="option"
          :aria-selected="isSelected(item)"
          @click="selectItem(item)"
          @mousemove="activeIndex = index"
        >
          <slot name="option" :item="item" :label="resolveLabel(item)">
            {{ resolveLabel(item) }}
          </slot>
        </li>
        <li v-if="filteredItems.length === 0" class="jt-select__empty">
          {{ noDataText }}
        </li>
      </ul>
    </JtPopover>
  </JtFieldShell>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue';

import JtFieldShell from '../internal/JtFieldShell.vue';
import JtPopover from '../internal/JtPopover.vue';
import { useDefaults, useField } from '@/composables';
import { deepEqual } from '@/utils';
import type { JtDensity, ValidationRule } from '@/types';

const props = withDefaults(
  defineProps<{
    /** Selected value. Can be any type (string/number/boolean/object). */
    modelValue?: unknown;
    /** Option list. Items may be primitives or objects. */
    items?: unknown[];
    /** Key (or getter) for an item's value. Defaults to `'value'`. */
    itemValue?: string | ((item: any) => unknown);
    /** Key (or getter) for an item's label. Defaults to `'label'`. */
    itemLabel?: string | ((item: any) => string);
    label?: string;
    placeholder?: string;
    hint?: string;
    name?: string;
    /** Allow selecting multiple values; `modelValue` becomes an array. */
    multiple?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    noDataText?: string;
    rules?: ValidationRule<any>[];
    errorMessages?: string;
    required?: boolean;
    loading?: boolean;
    disabled?: boolean;
    density?: JtDensity;
  }>(),
  {
    items: () => [],
    itemValue: 'value',
    itemLabel: 'label',
    searchable: true,
    clearable: false,
    noDataText: 'No results',
    density: undefined,
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: unknown] }>();

const inputId = useId();
const pick = useDefaults('JtSelect');
const density = computed(() => pick<JtDensity>('density', props.density, 'comfortable'));

const open = ref(false);
const search = ref('');
const activeIndex = ref(0);
const searchRef = ref<HTMLInputElement | null>(null);

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

const selectedValues = computed<unknown[]>(() =>
  props.multiple && Array.isArray(props.modelValue) ? props.modelValue : [],
);

const hasValue = computed(() =>
  props.multiple
    ? selectedValues.value.length > 0
    : props.modelValue !== null && props.modelValue !== undefined,
);

const selectedItem = computed(() =>
  props.items.find((item) => deepEqual(resolveValue(item), props.modelValue)),
);

const selectedItems = computed(() =>
  props.multiple
    ? props.items.filter((item) =>
        selectedValues.value.some((value) => deepEqual(value, resolveValue(item))),
      )
    : [],
);

const selectedLabel = computed(() =>
  selectedItem.value !== undefined ? resolveLabel(selectedItem.value) : '',
);

const searchPlaceholder = computed(() =>
  props.multiple
    ? selectedItems.value.length
      ? ''
      : props.placeholder
    : selectedLabel.value || props.placeholder,
);

const filteredItems = computed(() => {
  if (!props.searchable || search.value.trim() === '') return props.items;
  const query = search.value.toLowerCase();
  return props.items.filter((item) => resolveLabel(item).toLowerCase().includes(query));
});

function isSelected(item: unknown): boolean {
  if (props.multiple) {
    return selectedValues.value.some((value) => deepEqual(value, resolveValue(item)));
  }
  return deepEqual(resolveValue(item), props.modelValue);
}

function toggle(): void {
  if (props.disabled) return;
  if (open.value) close();
  else openMenu();
}

function openMenu(): void {
  open.value = true;
}

function close(): void {
  open.value = false;
}

function selectItem(item: unknown): void {
  const value = resolveValue(item);
  if (props.multiple) {
    // Toggle membership; keep the menu open for further selection.
    const exists = selectedValues.value.some((current) => deepEqual(current, value));
    const next = exists
      ? selectedValues.value.filter((current) => !deepEqual(current, value))
      : [...selectedValues.value, value];
    emit('update:modelValue', next);
    return;
  }
  emit('update:modelValue', value);
  close();
}

function clear(): void {
  emit('update:modelValue', props.multiple ? [] : null);
}

function onKeydown(event: KeyboardEvent): void {
  if (props.disabled) return;
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (!open.value) openMenu();
      else activeIndex.value = Math.min(activeIndex.value + 1, filteredItems.value.length - 1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      activeIndex.value = Math.max(activeIndex.value - 1, 0);
      break;
    case 'Enter':
      if (open.value && filteredItems.value[activeIndex.value] !== undefined) {
        event.preventDefault();
        selectItem(filteredItems.value[activeIndex.value]);
      }
      break;
    case 'Escape':
      if (open.value) {
        event.preventDefault();
        close();
      }
      break;
  }
}

const { errorMessage, hasError, onBlur } = useField<unknown>({
  getValue: () => props.modelValue,
  setValue: (value) => emit('update:modelValue', value),
  rules: () => props.rules,
  name: () => props.name,
  errorMessage: () => props.errorMessages,
});

watch(open, async (isOpen) => {
  if (isOpen) {
    search.value = '';
    activeIndex.value = Math.max(
      0,
      props.items.findIndex((item) => isSelected(item)),
    );
    if (props.searchable) {
      await nextTick();
      searchRef.value?.focus();
    }
  } else {
    onBlur();
  }
});

watch(search, () => {
  activeIndex.value = 0;
});

const controlClasses = computed(() => [
  `jt-field__control--${density.value}`,
  {
    'jt-field__control--error': hasError.value,
    'jt-field__control--disabled': props.disabled,
  },
]);
</script>
