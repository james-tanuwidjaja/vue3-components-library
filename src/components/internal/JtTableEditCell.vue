<template>
  <JtSelect
    v-if="column.type === 'select'"
    :model-value="modelValue"
    :items="column.items ?? []"
    :item-value="column.itemValue"
    :item-label="column.itemLabel"
    :rules="column.rules"
    :error-messages="error"
    density="compact"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <JtSelect
    v-else-if="column.type === 'boolean'"
    :model-value="modelValue"
    :items="booleanItems"
    :rules="column.rules"
    :error-messages="error"
    density="compact"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <JtDatePicker
    v-else-if="column.type === 'date'"
    :model-value="(modelValue as string) ?? null"
    :rules="column.rules"
    :error-messages="error"
    density="compact"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <JtNumberField
    v-else-if="column.type === 'number'"
    :model-value="(modelValue as number) ?? null"
    :rules="column.rules"
    :error-messages="error"
    density="compact"
    @update:model-value="emit('update:modelValue', $event)"
  />
  <JtTextField
    v-else
    :model-value="(modelValue as string) ?? ''"
    :rules="column.rules"
    :error-messages="error"
    density="compact"
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
  error?: string;
}>();

const emit = defineEmits<{ 'update:modelValue': [value: unknown] }>();

const booleanItems = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];
</script>
