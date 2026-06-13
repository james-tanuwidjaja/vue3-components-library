export interface MoneyFormatOptions {
  thousands: string;
  decimal: string;
  precision: number;
}

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Group the integer portion of a numeric string with the thousands separator. */
function groupThousands(intPart: string, separator: string): string {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * Format a number into a money string using the given separators and precision.
 * Example: `formatMoney(1234567.5, { thousands: '.', decimal: ',', precision: 2 })`
 * → `'1.234.567,50'`.
 */
export function formatMoney(
  value: number | string | null | undefined,
  options: MoneyFormatOptions,
): string {
  if (value === null || value === undefined || value === '') return '';

  const num = typeof value === 'number' ? value : parseMoney(value, options);
  if (Number.isNaN(num)) return '';

  const sign = num < 0 ? '-' : '';
  const fixed = Math.abs(num).toFixed(options.precision);
  const [intPart, decPart] = fixed.split('.');

  const grouped = groupThousands(intPart, options.thousands);
  return decPart ? `${sign}${grouped}${options.decimal}${decPart}` : `${sign}${grouped}`;
}

/**
 * Parse a money string (using the configured separators) back into a number.
 * Returns `NaN` when the string contains no digits.
 */
export function parseMoney(value: string | null | undefined, options: MoneyFormatOptions): number {
  if (value === null || value === undefined || value === '') return NaN;

  const thousandsRe = new RegExp(escapeRegExp(options.thousands), 'g');
  const normalized = String(value)
    .replace(thousandsRe, '')
    .replace(options.decimal, '.')
    .replace(/[^\d.-]/g, '');

  if (normalized === '' || normalized === '-' || normalized === '.') return NaN;
  return Number(normalized);
}
