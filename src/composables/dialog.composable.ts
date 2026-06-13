import { inject, markRaw, reactive, type Component } from 'vue';

import { JT_DIALOG_KEY } from '@/constants';
import type { JtDialogEntry, JtDialogOptions } from '@/types';

/** The reactive stack of open dialogs, rendered by `<JtDialogProvider />`. */
export const dialogStack = reactive<JtDialogEntry[]>([]);

let sequence = 0;

/**
 * Open `component` as a dialog and return a promise that resolves when the dialog closes.
 * Inside the component, call `useDialog().close(value)` to resolve with `value`.
 *
 * ```ts
 * const confirmed = await openDialog<boolean>(ConfirmDialog, { message: 'Delete?' });
 * ```
 */
export function openDialog<T = unknown>(
  component: Component,
  props: Record<string, unknown> = {},
  options: JtDialogOptions = {},
): Promise<T> {
  return new Promise<T>((resolve) => {
    dialogStack.push({
      id: ++sequence,
      component: markRaw(component),
      props,
      resolve: resolve as (value: unknown) => void,
      options,
    });
  });
}

/** Close the dialog with the given id, resolving its promise with `value`. */
export function closeDialog(id: number, value?: unknown): void {
  const index = dialogStack.findIndex((entry) => entry.id === id);
  if (index === -1) return;
  const [entry] = dialogStack.splice(index, 1);
  entry.resolve(value);
}

/** Access the current dialog's context from within a component opened via `openDialog()`. */
export function useDialog<T = unknown>() {
  const context = inject(JT_DIALOG_KEY, null);
  if (!context) {
    throw new Error('[jt] useDialog() must be called inside a component opened via openDialog().');
  }
  return {
    id: context.id,
    close: (value?: T) => context.close(value),
  };
}
