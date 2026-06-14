import type { JtResolvedConfig } from '@/types';

/** Built-in fallback configuration used when `createJt()` is not installed, or to fill gaps. */
export const DEFAULT_CONFIG: JtResolvedConfig = {
  theme: {
    defaultTheme: 'light',
    colors: {},
    radius: undefined,
  },
  locale: {
    dateFormat: 'DD/MM/YYYY',
    dateTimeFormat: 'DD/MM/YYYY HH:mm',
    money: {
      thousands: '.',
      decimal: ',',
      precision: 2,
    },
  },
  defaults: {},
};

/** Maps `JtThemeColors` keys to the `--jt-*` CSS variables written on the document root. */
export const THEME_COLOR_VARS: Record<string, string> = {
  primary: '--jt-primary',
  primaryHover: '--jt-primary-hover',
  onPrimary: '--jt-on-primary',
  surface: '--jt-surface',
  surfaceMuted: '--jt-surface-muted',
  onSurface: '--jt-on-surface',
  border: '--jt-border',
  muted: '--jt-muted',
  error: '--jt-error',
  success: '--jt-success',
  successHover: '--jt-success-hover',
  onSuccess: '--jt-on-success',
  warning: '--jt-warning',
  warningHover: '--jt-warning-hover',
  onWarning: '--jt-on-warning',
  danger: '--jt-danger',
  dangerHover: '--jt-danger-hover',
  onDanger: '--jt-on-danger',
  info: '--jt-info',
  infoHover: '--jt-info-hover',
  onInfo: '--jt-on-info',
  secondary: '--jt-secondary',
  secondaryHover: '--jt-secondary-hover',
  onSecondary: '--jt-on-secondary',
};
