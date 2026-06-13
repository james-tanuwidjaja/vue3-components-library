import type { ValidationRule } from './validation.type';

export type JtColumnType = 'string' | 'number' | 'date' | 'boolean' | 'select';

export type JtSortDirection = 'asc' | 'desc' | null;

export interface JtSortState {
  key: string | null;
  direction: JtSortDirection;
}

export interface JtTableColumn<T = any> {
  /** Property key on the row object. */
  key: string;
  /** Header text. */
  label: string;
  /** Drives the filter input and default formatting. Defaults to `'string'`. */
  type?: JtColumnType;
  /** Allow sorting on this column. Defaults to `true`. */
  sortable?: boolean;
  /** Allow filtering on this column. Defaults to `true`. */
  filterable?: boolean;
  /** Fixed column width (CSS). */
  width?: string;
  /** Cell text alignment. */
  align?: 'left' | 'center' | 'right';
  /** Options for `type: 'select'` (filter and SmartTable editing). */
  items?: unknown[];
  itemValue?: string | ((item: any) => unknown);
  itemLabel?: string | ((item: any) => string);
  /** Custom display formatter. */
  format?: (value: any, row: T) => string;
  /** Validation rules used by SmartTable editing. */
  rules?: ValidationRule<any>[];
  /** Whether the column is editable in SmartTable. Defaults to `true`. */
  editable?: boolean;
}
