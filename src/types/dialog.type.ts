import type { Component } from 'vue';

export interface JtDialogOptions {
  /** When true, backdrop click and Escape do not close the dialog. */
  persistent?: boolean;
}

export interface JtDialogEntry {
  id: number;
  component: Component;
  props: Record<string, unknown>;
  resolve: (value: unknown) => void;
  options: JtDialogOptions;
}

/** Per-dialog context provided to the opened component (via `useDialog()`). */
export interface JtDialogContext {
  id: number;
  /** Resolve the `openDialog()` promise with `value` and close this dialog. */
  close: (value?: unknown) => void;
}
