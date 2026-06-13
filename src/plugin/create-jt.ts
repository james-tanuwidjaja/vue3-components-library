import { reactive, type App, type Component } from 'vue';

import { JT_CONFIG_KEY, DEFAULT_CONFIG } from '@/constants';
import { applyTheme } from '@/composables';
import * as components from '@/components';
import type { JtOptions, JtResolvedConfig } from '@/types';

/** Merge user options over the built-in defaults into a fully-resolved config. */
function resolveConfig(options: JtOptions): JtResolvedConfig {
  return {
    theme: {
      defaultTheme: options.theme?.defaultTheme ?? DEFAULT_CONFIG.theme.defaultTheme,
      colors: { ...DEFAULT_CONFIG.theme.colors, ...(options.theme?.colors ?? {}) },
      radius: options.theme?.radius ?? DEFAULT_CONFIG.theme.radius,
    },
    locale: {
      dateFormat: options.locale?.dateFormat ?? DEFAULT_CONFIG.locale.dateFormat,
      dateTimeFormat: options.locale?.dateTimeFormat ?? DEFAULT_CONFIG.locale.dateTimeFormat,
      money: { ...DEFAULT_CONFIG.locale.money, ...(options.locale?.money ?? {}) },
    },
    defaults: options.defaults ?? {},
  };
}

export interface JtInstance {
  install: (app: App) => void;
  /** The reactive resolved configuration. Mutate to change theme/locale/defaults at runtime. */
  config: JtResolvedConfig;
}

/**
 * Create the library plugin. Install it with `app.use(createJt(options))`:
 * it registers every `Jt*` component globally, provides the resolved config to all
 * descendants, and applies the theme to the document root.
 */
export function createJt(options: JtOptions = {}): JtInstance {
  const config = reactive(resolveConfig(options)) as JtResolvedConfig;

  const install = (app: App): void => {
    app.provide(JT_CONFIG_KEY, config);

    for (const [name, component] of Object.entries(components)) {
      app.component(name, component as Component);
    }

    applyTheme(config);
  };

  return { install, config };
}
