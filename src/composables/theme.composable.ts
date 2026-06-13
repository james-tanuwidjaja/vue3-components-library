import { THEME_COLOR_VARS } from '@/constants';
import type { JtResolvedConfig, JtTheme } from '@/types';

/** Write the configured color palette and radius onto the document root as `--jt-*` variables. */
export function applyThemeColors(
  config: JtResolvedConfig,
  root: HTMLElement | null = typeof document !== 'undefined' ? document.documentElement : null,
): void {
  if (!root) return;

  for (const [colorKey, cssVar] of Object.entries(THEME_COLOR_VARS)) {
    const value = (config.theme.colors as Record<string, string | undefined>)[colorKey];
    if (value) root.style.setProperty(cssVar, value);
  }

  if (config.theme.radius) root.style.setProperty('--jt-radius', config.theme.radius);
}

/** Toggle the active theme class (`jt-theme-light` / `jt-theme-dark`) on the document root. */
export function applyThemeMode(
  theme: JtTheme,
  root: HTMLElement | null = typeof document !== 'undefined' ? document.documentElement : null,
): void {
  if (!root) return;
  root.classList.remove('jt-theme-light', 'jt-theme-dark');
  root.classList.add(`jt-theme-${theme}`);
}

/** Apply the full theme (colors, radius, and mode) from a resolved config. */
export function applyTheme(config: JtResolvedConfig, root?: HTMLElement | null): void {
  applyThemeColors(config, root);
  applyThemeMode(config.theme.defaultTheme, root);
}
