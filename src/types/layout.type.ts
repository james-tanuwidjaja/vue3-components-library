import type { Component, Ref } from 'vue';

/** A sidebar menu entry. Extra fields (e.g. `roles`) are allowed for `canAccess` to read. */
export interface JtMenuItem {
  /** Stable key; falls back to `label` when omitted. */
  key?: string | number;
  /**
   * Entry kind. `'title'` renders a non-clickable section caption, `'divider'` a separator line.
   * Omitted (or `'item'`) is a normal clickable menu item.
   */
  type?: 'item' | 'title' | 'divider';
  label: string;
  /** Icon: a CSS class string (icon fonts) or a Vue component. */
  icon?: string | Component;
  /** Router target, rendered via the sidebar's `linkComponent`. */
  to?: string | object;
  /** Plain anchor href. */
  href?: string;
  /** Nested items (renders an expandable group). */
  children?: JtMenuItem[];
  disabled?: boolean;
  [extra: string]: unknown;
}

/** Predicate deciding whether a menu item is visible. */
export type JtCanAccess = (item: JtMenuItem) => boolean;

/** Shared layout state provided by `JtLayout` and consumed by `JtHeader` / `JtSidebar`. */
export interface JtLayoutContext {
  collapsed: Ref<boolean>;
  expandOnHover: Ref<boolean>;
  toggle: () => void;
  setCollapsed: (value: boolean) => void;
}
