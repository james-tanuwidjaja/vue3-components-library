import { describe, it, expect } from 'vitest';

import { formatDate, parseDate, formatISODate, toDateFnsPattern } from './date.util';

describe('toDateFnsPattern', () => {
  it('lowercases year and day tokens', () => {
    expect(toDateFnsPattern('DD/MM/YYYY')).toBe('dd/MM/yyyy');
  });
});

describe('formatDate', () => {
  it('formats with the library date tokens', () => {
    expect(formatDate(new Date(2024, 0, 5), 'DD/MM/YYYY')).toBe('05/01/2024');
  });

  it('returns empty string for nullish input', () => {
    expect(formatDate(null, 'DD/MM/YYYY')).toBe('');
  });
});

describe('parseDate', () => {
  it('parses a DD/MM/YYYY string', () => {
    const d = parseDate('05/01/2024', 'DD/MM/YYYY');
    expect(d?.getFullYear()).toBe(2024);
    expect(d?.getMonth()).toBe(0);
    expect(d?.getDate()).toBe(5);
  });

  it('returns null for invalid input', () => {
    expect(parseDate('not-a-date', 'DD/MM/YYYY')).toBeNull();
  });
});

describe('formatISODate', () => {
  it('formats as YYYY-MM-DD', () => {
    expect(formatISODate(new Date(2024, 0, 5))).toBe('2024-01-05');
  });
});
