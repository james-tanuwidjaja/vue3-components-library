import { inject } from 'vue';

import { JT_LAYOUT_KEY } from '@/constants';
import type { JtLayoutContext } from '@/types';

/**
 * Access the enclosing `JtLayout` context (collapsed state + toggle). Returns `null` when used
 * outside a `JtLayout`, so `JtHeader` / `JtSidebar` can fall back to their own `collapsed` v-model.
 */
export function useJtLayout(): JtLayoutContext | null {
  return inject(JT_LAYOUT_KEY, null);
}
