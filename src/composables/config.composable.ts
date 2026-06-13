import { inject } from 'vue';

import { JT_CONFIG_KEY, DEFAULT_CONFIG } from '@/constants';
import type { JtResolvedConfig } from '@/types';

/**
 * Access the resolved library configuration. Falls back to built-in defaults when
 * `createJt()` has not been installed, so components work standalone too.
 */
export function useJtConfig(): JtResolvedConfig {
  return inject(JT_CONFIG_KEY, DEFAULT_CONFIG);
}

/**
 * Returns a `pick` helper that resolves a prop value against the configured defaults:
 * explicit prop → component default → global default → built-in fallback.
 *
 * Call it inside a `computed` to stay reactive to config changes.
 */
export function useDefaults(componentName: string) {
  const config = useJtConfig();

  return function pick<T>(key: string, value: T | undefined, fallback: T): T {
    if (value !== undefined) return value;

    const componentDefaults = config.defaults[componentName] as Record<string, unknown> | undefined;
    const componentDefault = componentDefaults?.[key];
    if (componentDefault !== undefined) return componentDefault as T;

    const globalDefault = (config.defaults.global as Record<string, unknown> | undefined)?.[key];
    if (globalDefault !== undefined) return globalDefault as T;

    return fallback;
  };
}
