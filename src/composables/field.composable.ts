import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
} from 'vue';

import { JT_FORM_KEY } from '@/constants';
import { deepClone, deepEqual } from '@/utils';
import type { JtFieldHandle, ValidationRule } from '@/types';

export interface UseFieldParams<T> {
  /** Read the field's current value (used for validation and dirty checks). */
  getValue: () => T;
  /** Write a value to the field (used by reset). */
  setValue: (value: T) => void;
  /** Validation rules to run, in order. */
  rules?: MaybeRefOrGetter<ValidationRule<T>[] | undefined>;
  /** Field name; keys the value within an enclosing form's `initialValues`. */
  name?: MaybeRefOrGetter<string | undefined>;
  /** Externally-supplied error message (takes precedence over rule results when set). */
  errorMessage?: MaybeRefOrGetter<string | undefined>;
}

/**
 * Shared field behaviour: rule execution, error message state, blur handling, reset, and
 * auto-registration with an enclosing `JtForm` for form-wide validate/reset/dirty.
 */
export function useField<T>(params: UseFieldParams<T>) {
  const form = inject(JT_FORM_KEY, null);
  const id = Symbol('jt-field');

  const ruleError = ref('');
  const touched = ref(false);

  const name = (): string | undefined => toValue(params.name);

  // Initial value snapshot for standalone use; an enclosing form overrides this by name.
  const localInitial = ref(deepClone(params.getValue())) as { value: T };

  const initialValue = (): T => {
    if (form && name() !== undefined) {
      const fromForm = form.getInitialValue(name());
      if (fromForm !== undefined) return fromForm as T;
    }
    return localInitial.value;
  };

  function runRules(): boolean {
    const rules = toValue(params.rules) ?? [];
    for (const rule of rules) {
      const result = rule(params.getValue());
      if (result !== true) {
        ruleError.value = result;
        return false;
      }
    }
    ruleError.value = '';
    return true;
  }

  /** Force validation (marks the field touched). */
  function validate(): boolean {
    touched.value = true;
    return runRules();
  }

  function resetValidation(): void {
    ruleError.value = '';
    touched.value = false;
  }

  function reset(): void {
    params.setValue(deepClone(initialValue()));
    resetValidation();
  }

  function isDirty(): boolean {
    return !deepEqual(params.getValue(), initialValue());
  }

  function onBlur(): void {
    touched.value = true;
    runRules();
  }

  // Re-validate on change once the field has been interacted with, and notify the form.
  watch(
    () => params.getValue(),
    () => {
      if (touched.value) runRules();
      form?.notifyChange();
    },
    { deep: true },
  );

  // The external message (e.g. a server error) wins over rule output.
  const errorMessage = computed(() => toValue(params.errorMessage) || ruleError.value);
  const hasError = computed(() => errorMessage.value !== '');

  onMounted(() => {
    if (!form) return;
    const handle: JtFieldHandle = {
      id,
      name: name(),
      validate,
      resetValidation,
      reset,
      isDirty,
    };
    form.register(handle);
  });
  onBeforeUnmount(() => form?.unregister(id));

  return { errorMessage, hasError, touched, validate, resetValidation, reset, isDirty, onBlur };
}
