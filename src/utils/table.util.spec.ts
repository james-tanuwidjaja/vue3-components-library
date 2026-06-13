import { describe, it, expect } from 'vitest';

import { formatCellValue, matchesFilter, compareValues, nextSortDirection } from './table.util';
import type { JtTableColumn } from '@/types';

const statusCol: JtTableColumn = {
  key: 'status',
  label: 'Status',
  type: 'select',
  items: [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 },
  ],
};

describe('formatCellValue', () => {
  it('formats booleans as Yes/No', () => {
    const col: JtTableColumn = { key: 'active', label: 'Active', type: 'boolean' };
    expect(formatCellValue(true, col, {})).toBe('Yes');
    expect(formatCellValue(false, col, {})).toBe('No');
  });

  it('resolves select labels from value', () => {
    expect(formatCellValue(1, statusCol, {})).toBe('Active');
    expect(formatCellValue(0, statusCol, {})).toBe('Inactive');
  });

  it('uses a custom formatter when provided', () => {
    const col: JtTableColumn = { key: 'price', label: 'Price', format: (v) => `$${v}` };
    expect(formatCellValue(10, col, {})).toBe('$10');
  });
});

describe('matchesFilter', () => {
  it('does substring match for string/number', () => {
    expect(matchesFilter('Hello', 'ell', 'string')).toBe(true);
    expect(matchesFilter(12345, '234', 'number')).toBe(true);
    expect(matchesFilter('Hello', 'xyz', 'string')).toBe(false);
  });

  it('matches select/boolean by exact value', () => {
    expect(matchesFilter(1, 1, 'select')).toBe(true);
    expect(matchesFilter(true, false, 'boolean')).toBe(false);
  });

  it('passes through when the filter is empty', () => {
    expect(matchesFilter('anything', '', 'string')).toBe(true);
    expect(matchesFilter('anything', null, 'select')).toBe(true);
  });
});

describe('compareValues', () => {
  it('compares numbers numerically', () => {
    expect(compareValues(2, 10, 'number')).toBeLessThan(0);
  });

  it('compares strings alphabetically', () => {
    expect(compareValues('b', 'a', 'string')).toBeGreaterThan(0);
  });
});

describe('nextSortDirection', () => {
  it('cycles null -> asc -> desc -> null', () => {
    expect(nextSortDirection(null)).toBe('asc');
    expect(nextSortDirection('asc')).toBe('desc');
    expect(nextSortDirection('desc')).toBe(null);
  });
});
