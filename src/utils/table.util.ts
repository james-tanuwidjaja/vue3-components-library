import { formatISODate, parseISODate } from './date.util';
import type { JtColumnType, JtTableColumn, JtSortDirection } from '@/types';

const isObject = (item: unknown): item is Record<string, unknown> =>
  typeof item === 'object' && item !== null;

/** Resolve an item's value for a select-type column. */
function resolveItemValue(item: unknown, column: JtTableColumn): unknown {
  if (typeof column.itemValue === 'function') return column.itemValue(item);
  return isObject(item) ? item[column.itemValue ?? 'value'] : item;
}

/** Resolve an item's label for a select-type column. */
function resolveItemLabel(item: unknown, column: JtTableColumn): string {
  if (typeof column.itemLabel === 'function') return column.itemLabel(item);
  return isObject(item) ? String(item[column.itemLabel ?? 'label'] ?? '') : String(item);
}

/** Normalize any cell value to a comparable ISO date string (or null). */
function toISODate(value: unknown): string | null {
  if (value instanceof Date) return formatISODate(value);
  if (typeof value === 'string') {
    const parsed = parseISODate(value);
    return parsed ? formatISODate(parsed) : value;
  }
  return null;
}

/** Format a cell value for display based on its column type. */
export function formatCellValue(value: unknown, column: JtTableColumn, row: unknown): string {
  if (column.format) return column.format(value, row);
  if (value === null || value === undefined || value === '') return '';

  switch (column.type) {
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'date':
      return toISODate(value) ?? String(value);
    case 'select': {
      const match = column.items?.find((item) => resolveItemValue(item, column) === value);
      return match ? resolveItemLabel(match, column) : String(value);
    }
    default:
      return String(value);
  }
}

/** Whether a row's cell value matches an active filter value for the column. */
export function matchesFilter(value: unknown, filter: unknown, type: JtColumnType): boolean {
  if (filter === null || filter === undefined || filter === '') return true;

  switch (type) {
    case 'date':
      return toISODate(value) === toISODate(filter);
    case 'boolean':
    case 'select':
      return value === filter;
    case 'number':
    case 'string':
    default:
      return String(value ?? '')
        .toLowerCase()
        .includes(String(filter).toLowerCase());
  }
}

/** Compare two cell values for sorting given a column type. */
export function compareValues(a: unknown, b: unknown, type: JtColumnType): number {
  if (a === b) return 0;
  if (a === null || a === undefined) return -1;
  if (b === null || b === undefined) return 1;

  if (type === 'number') return Number(a) - Number(b);
  if (type === 'date') {
    const da = toISODate(a) ?? '';
    const db = toISODate(b) ?? '';
    return da < db ? -1 : da > db ? 1 : 0;
  }
  if (type === 'boolean') return Number(a) - Number(b);
  return String(a).localeCompare(String(b));
}

/** Cycle a sort direction: null → asc → desc → null. */
export function nextSortDirection(current: JtSortDirection): JtSortDirection {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null;
}
