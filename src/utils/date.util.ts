import { format as fnsFormat, parse as fnsParse, isValid } from 'date-fns';

/**
 * Convert moment-style tokens (the format the library exposes to users, e.g. `DD/MM/YYYY`)
 * to the date-fns equivalents (`dd/MM/yyyy`). Only year (`Y`) and day-of-month (`D`) differ
 * in case between the two libraries.
 */
export const toDateFnsPattern = (pattern: string): string =>
  pattern.replace(/Y/g, 'y').replace(/D/g, 'd');

/** ISO date pattern used for the `JtDatePicker` primary model value. */
export const ISO_DATE = 'YYYY-MM-DD';

/** Format a date using a moment-style pattern. Returns `''` for nullish/invalid input. */
export function formatDate(date: Date | null | undefined, pattern: string): string {
  if (!date || !isValid(date)) return '';
  return fnsFormat(date, toDateFnsPattern(pattern));
}

/** Parse a string into a `Date` using a moment-style pattern. Returns `null` when invalid. */
export function parseDate(value: string | null | undefined, pattern: string): Date | null {
  if (!value) return null;
  const parsed = fnsParse(value, toDateFnsPattern(pattern), new Date());
  return isValid(parsed) ? parsed : null;
}

/** Format a date as `YYYY-MM-DD`. */
export function formatISODate(date: Date | null | undefined): string {
  return formatDate(date, ISO_DATE);
}

/** Parse a `YYYY-MM-DD` string into a `Date`. */
export function parseISODate(value: string | null | undefined): Date | null {
  return parseDate(value, ISO_DATE);
}
