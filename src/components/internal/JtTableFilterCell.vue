<template>
  <JtSelect
    v-if="column.type === 'select'"
    :model-value="modelValue"
    :items="column.items ?? []"
    :item-value="column.itemValue"
    :item-label="column.itemLabel"
    density="compact"
    clearable
    placeholder="Filter"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <JtSelect
    v-else-if="column.type === 'boolean'"
    :model-value="modelValue"
    :items="booleanItems"
    density="compact"
    clearable
    placeholder="Filter"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <JtDatePicker
    v-else-if="column.type === 'date'"
    :model-value="(modelValue as string) ?? null"
    density="compact"
    clearable
    placeholder="Filter"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <JtNumberField
    v-else-if="column.type === 'number'"
    :model-value="(modelValue as number) ?? null"
    density="compact"
    placeholder="Filter"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <JtTextField
    v-else
    :model-value="(modelValue as string) ?? ''"
    density="compact"
    placeholder="Filter"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import JtTextField from '../JtTextField/JtTextField.vue';
import JtNumberField from '../JtNumberField/JtNumberField.vue';
import JtDatePicker from '../JtDatePicker/JtDatePicker.vue';
import JtSelect from '../JtSelect/JtSelect.vue';
import type { JtTableColumn } from '@/types';

defineProps<{
  column: JtTableColumn;
  modelValue: unknown;
}>();

const emit = defineEmits<{ 'update:modelValue': [value: unknown] }>();

const booleanItems = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];
</script>
