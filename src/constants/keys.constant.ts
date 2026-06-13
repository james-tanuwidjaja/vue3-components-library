import type { InjectionKey } from 'vue';

import type { JtResolvedConfig, JtFormContext, JtDialogContext } from '@/types';

/** Injection key for the resolved library configuration provided by `createJt()`. */
export const JT_CONFIG_KEY: InjectionKey<JtResolvedConfig> = Symbol('jt-config');

/** Injection key for the enclosing `JtForm` context. */
export const JT_FORM_KEY: InjectionKey<JtFormContext> = Symbol('jt-form');

/** Injection key for the active dialog context (provided to components opened via openDialog). */
export const JT_DIALOG_KEY: InjectionKey<JtDialogContext> = Symbol('jt-dialog');
