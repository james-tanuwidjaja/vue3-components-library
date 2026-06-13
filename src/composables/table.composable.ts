import { computed, reactive, ref, watch, type Ref } from 'vue';

import { matchesFilter, compareValues, nextSortDirection } from '@/utils';
import type { JtSortState, JtTableColumn } from '@/types';

/**
 * Reactive filtering, sorting, and pagination for a table. Shared by `JtDataTable`
 * and `JtSmartTable`.
 */
export function useTableData(
  columns: Ref<JtTableColumn[]>,
  items: Ref<any[]>,
  pageSize: Ref<number>,
) {
  const filters = reactive<Record<string, unknown>>({});
  const sort = ref<JtSortState>({ key: null, direction: null });
  const page = ref(1);

  const columnByKey = computed(() => {
    const map: Record<string, JtTableColumn> = {};
    for (const column of columns.value) map[column.key] = column;
    return map;
  });

  const filtered = computed(() =>
    items.value.filter((row) =>
      columns.value.every((column) =>
        matchesFilter(row?.[column.key], filters[column.key], column.type ?? 'string'),
      ),
    ),
  );

  const sorted = computed(() => {
    const { key, direction } = sort.value;
    if (!key || !direction) return filtered.value;
    const type = columnByKey.value[key]?.type ?? 'string';
    const factor = direction === 'asc' ? 1 : -1;
    return [...filtered.value].sort((a, b) => compareValues(a?.[key], b?.[key], type) * factor);
  });

  const totalPages = computed(() => Math.max(1, Math.ceil(sorted.value.length / pageSize.value)));

  const paged = computed(() => {
    const current = Math.min(page.value, totalPages.value);
    const start = (current - 1) * pageSize.value;
    return sorted.value.slice(start, start + pageSize.value);
  });

  function toggleSort(key: string): void {
    if (sort.value.key !== key) {
      sort.value = { key, direction: 'asc' };
      return;
    }
    const direction = nextSortDirection(sort.value.direction);
    sort.value = { key: direction ? key : null, direction };
  }

  // Reset to the first page when the filter set changes.
  watch(filters, () => {
    page.value = 1;
  });

  return { filters, sort, page, filtered, sorted, paged, totalPages, toggleSort };
}
