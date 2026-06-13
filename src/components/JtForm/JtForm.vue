<template>
  <form class="jt-form" novalidate @submit.prevent="onSubmit">
    <slot
      :is-dirty="isDirty"
      :validate="validate"
      :reset="reset"
      :reset-validation="resetValidation"
    />
  </form>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';

import { JT_FORM_KEY } from '@/constants';
import type { JtFieldHandle, JtFormContext } from '@/types';

const props = withDefaults(
  defineProps<{
    /**
     * Initial values keyed by field `name`. Empty for "create"; set to the loaded record
     * for "edit". Drives both reset() and change detection.
     */
    initialValues?: Record<string, unknown>;
  }>(),
  { initialValues: () => ({}) },
);

const emit = defineEmits<{
  submit: [payload: { valid: boolean }];
  'update:dirty': [value: boolean];
}>();

const fields = new Map<symbol, JtFieldHandle>();
// Bumped on register/unregister/change so reactive derivations recompute.
const tick = ref(0);

const context: JtFormContext = {
  register(field) {
    fields.set(field.id, field);
    tick.value++;
  },
  unregister(id) {
    fields.delete(id);
    tick.value++;
  },
  getInitialValue(name) {
    return name ? props.initialValues[name] : undefined;
  },
  notifyChange() {
    tick.value++;
  },
};

provide(JT_FORM_KEY, context);

/** Validate every registered field. Returns `true` only if all pass. */
function validate(): boolean {
  let valid = true;
  for (const field of fields.values()) {
    if (!field.validate()) valid = false;
  }
  return valid;
}

/** Restore every field to its initial value and clear validation. */
function reset(): void {
  for (const field of fields.values()) field.reset();
}

/** Clear validation messages without touching values. */
function resetValidation(): void {
  for (const field of fields.values()) field.resetValidation();
}

const isDirty = computed<boolean>(() => {
  void tick.value;
  for (const field of fields.values()) {
    if (field.isDirty()) return true;
  }
  return false;
});

watch(isDirty, (value) => emit('update:dirty', value));

function onSubmit(): void {
  emit('submit', { valid: validate() });
}

defineExpose({
  validate,
  reset,
  resetValidation,
  get isDirty() {
    return isDirty.value;
  },
});
</script>
