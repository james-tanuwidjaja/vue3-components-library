/**
 * A validation rule receives the field value and returns `true` when valid, or an error
 * message string when invalid.
 */
export type ValidationRule<T = any> = (value: T) => true | string;
