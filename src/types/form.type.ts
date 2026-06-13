/** Internal handle a field registers with its enclosing `JtForm`. */
export interface JtFieldHandle {
  id: symbol;
  /** The field's `name` prop, used to key values within the form model. */
  name?: string;
  /** Run the field's rules; returns `true` when valid. */
  validate: () => boolean;
  /** Clear validation state without changing the value. */
  resetValidation: () => void;
  /** Restore the field to its initial value (driven by the form's `initialValues`). */
  reset: () => void;
  /** Whether the field's current value differs from its initial value. */
  isDirty: () => boolean;
}

/** Form context shared with descendant fields via provide/inject. */
export interface JtFormContext {
  register: (field: JtFieldHandle) => void;
  unregister: (id: symbol) => void;
  /** Resolve a field's initial value from the form's `initialValues` by name. */
  getInitialValue: (name: string | undefined) => unknown;
  /** Notify the form that a field's value or dirty state changed. */
  notifyChange: () => void;
}
