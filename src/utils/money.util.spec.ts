import { describe, it, expect } from 'vitest';

import { formatMoney, parseMoney, type MoneyFormatOptions } from './money.util';

const opts: MoneyFormatOptions = { thousands: '.', decimal: ',', precision: 2 };

describe('formatMoney', () => {
  it('groups thousands and applies the decimal separator', () => {
    expect(formatMoney(1234567.5, opts)).toBe('1.234.567,50');
  });

  it('handles zero and negatives', () => {
    expect(formatMoney(0, opts)).toBe('0,00');
    expect(formatMoney(-1000, opts)).toBe('-1.000,00');
  });

  it('returns empty string for nullish input', () => {
    expect(formatMoney(null, opts)).toBe('');
    expect(formatMoney(undefined, opts)).toBe('');
  });

  it('respects custom separators', () => {
    expect(formatMoney(1234.5, { thousands: ',', decimal: '.', precision: 2 })).toBe('1,234.50');
  });
});

describe('parseMoney', () => {
  it('parses a formatted string back to a number', () => {
    expect(parseMoney('1.234.567,50', opts)).toBe(1234567.5);
  });

  it('returns NaN for empty input', () => {
    expect(Number.isNaN(parseMoney('', opts))).toBe(true);
  });

  it('round-trips with formatMoney', () => {
    expect(parseMoney(formatMoney(9876.54, opts), opts)).toBe(9876.54);
  });
});
