// Styles are imported so the library build emits a single precompiled CSS file.
import './assets/styles/index.css';

// Plugin factory (Vuetify-style install).
export { createJt } from './plugin';
export type { JtInstance } from './plugin/create-jt';

// Components.
export * from './components';

// Composables.
export {
  useJtConfig,
  useDefaults,
  useField,
  applyTheme,
  applyThemeColors,
  applyThemeMode,
} from './composables';
export type { UseFieldParams } from './composables/field.composable';

// Validation rule helpers.
export {
  rules,
  required,
  minLength,
  maxLength,
  min,
  max,
  email,
  numeric,
  pattern,
} from './constants';

// Injection keys (advanced use).
export { JT_CONFIG_KEY, JT_FORM_KEY } from './constants';

// Utilities.
export {
  formatDate,
  parseDate,
  formatISODate,
  parseISODate,
  toDateFnsPattern,
  formatMoney,
  parseMoney,
  deepClone,
  deepEqual,
} from './utils';
export type { MoneyFormatOptions } from './utils/money.util';

// Services.
export { LoggerService, logger } from './services';
export type { LogLevel, LoggerOptions } from './services/logger.service';

// Public types.
export type * from './types';
