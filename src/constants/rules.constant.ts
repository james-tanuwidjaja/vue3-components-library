import type { ValidationRule } from '@/types';

const isEmpty = (value: unknown): boolean =>
  value === null ||
  value === undefined ||
  value === '' ||
  (Array.isArray(value) && value.length === 0);

/** Value must not be empty. */
export const required =
  (message = 'This field is required'): ValidationRule =>
  (value) =>
    !isEmpty(value) || message;

/** String/array length must be at least `min`. */
export const minLength =
  (min: number, message?: string): ValidationRule<string | unknown[]> =>
  (value) =>
    isEmpty(value) ||
    (value?.length ?? 0) >= min ||
    (message ?? `Must be at least ${min} characters`);

/** String/array length must be at most `max`. */
export const maxLength =
  (max: number, message?: string): ValidationRule<string | unknown[]> =>
  (value) =>
    isEmpty(value) ||
    (value?.length ?? 0) <= max ||
    (message ?? `Must be at most ${max} characters`);

/** Numeric value must be >= `min`. */
export const min =
  (minValue: number, message?: string): ValidationRule<number> =>
  (value) =>
    isEmpty(value) || Number(value) >= minValue || (message ?? `Must be at least ${minValue}`);

/** Numeric value must be <= `max`. */
export const max =
  (maxValue: number, message?: string): ValidationRule<number> =>
  (value) =>
    isEmpty(value) || Number(value) <= maxValue || (message ?? `Must be at most ${maxValue}`);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Value must look like an email address. */
export const email =
  (message = 'Must be a valid email address'): ValidationRule<string> =>
  (value) =>
    isEmpty(value) || EMAIL_RE.test(String(value)) || message;

/** Value must be a finite number. */
export const numeric =
  (message = 'Must be a number'): ValidationRule =>
  (value) =>
    isEmpty(value) || (!Number.isNaN(Number(value)) && Number.isFinite(Number(value))) || message;

/** Value must match the given regular expression. */
export const pattern =
  (re: RegExp, message = 'Invalid format'): ValidationRule<string> =>
  (value) =>
    isEmpty(value) || re.test(String(value)) || message;

/** Convenience namespace mirroring Vuetify-style rule access (`rules.required()`). */
export const rules = {
  required,
  minLength,
  maxLength,
  min,
  max,
  email,
  numeric,
  pattern,
};
