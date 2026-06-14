import type { JtDensity, JtTheme } from './common.type';

/** Configurable color palette. Any omitted color falls back to the built-in default. */
export interface JtThemeColors {
  primary?: string;
  primaryHover?: string;
  onPrimary?: string;
  surface?: string;
  surfaceMuted?: string;
  onSurface?: string;
  border?: string;
  muted?: string;
  error?: string;
  success?: string;
  warning?: string;
}

export interface JtThemeOptions {
  /** Theme applied on install. Defaults to `'light'`. */
  defaultTheme?: JtTheme;
  /** Color overrides written to the document root as CSS variables. */
  colors?: JtThemeColors;
  /** Base border radius, e.g. `'0.5rem'`. */
  radius?: string;
}

export interface JtMoneyOptions {
  /** Thousands separator. Defaults to `'.'`. */
  thousands?: string;
  /** Decimal separator. Defaults to `','`. */
  decimal?: string;
  /** Number of decimal places. Defaults to `2`. */
  precision?: number;
}

export interface JtLocaleOptions {
  /** Default display date format (date tokens, e.g. `DD/MM/YYYY`). Defaults to `'DD/MM/YYYY'`. */
  dateFormat?: string;
  /** Default datetime display format. Defaults to `'DD/MM/YYYY HH:mm'`. */
  dateTimeFormat?: string;
  /** Money formatting defaults. */
  money?: JtMoneyOptions;
}

/** Global default props, overridable per component instance. */
export interface JtGlobalDefaults {
  density?: JtDensity;
}

/**
 * Default props keyed by component name (e.g. `JtButton`), plus a `global` bucket that
 * applies to every component. Values are merged underneath explicit props at runtime.
 */
export interface JtDefaults {
  global?: JtGlobalDefaults;
  [componentName: string]: Record<string, unknown> | JtGlobalDefaults | undefined;
}

/** Options passed to `createJt()`. Everything is optional. */
export interface JtOptions {
  theme?: JtThemeOptions;
  locale?: JtLocaleOptions;
  defaults?: JtDefaults;
}

/** Fully-resolved, reactive configuration provided to every component. */
export interface JtResolvedConfig {
  theme: {
    defaultTheme: JtTheme;
    colors: JtThemeColors;
    radius?: string;
  };
  locale: {
    dateFormat: string;
    dateTimeFormat: string;
    money: Required<JtMoneyOptions>;
  };
  defaults: JtDefaults;
}
