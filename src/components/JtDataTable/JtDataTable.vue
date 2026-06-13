<template>
  <div class="jt-datatable">
    <div class="jt-table__wrapper">
      <table class="jt-table">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :style="headerStyle(column)"
              :class="{ 'jt-table__sortable': isSortable(column) }"
              @click="isSortable(column) && toggleSort(column.key)"
            >
              {{ column.label }}
              <span v-if="isSortable(column)" class="jt-table__sort-icon">
                {{ sortIcon(column.key) }}
              </span>
            </th>
            <th v-if="$slots.actions" style="width: 1%">{{ actionsLabel }}</th>
          </tr>

          <tr v-if="showFilters" class="jt-table__filters">
            <td v-for="column in columns" :key="column.key">
              <JtTableFilterCell
                v-if="column.filterable !== false"
                :column="column"
                :model-value="filters[column.key]"
                @update:model-value="filters[column.key] = $event"
              />
            </td>
            <td v-if="$slots.actions"></td>
          </tr>
        </thead>

        <tbody>
          <template v-if="loading">
            <tr v-for="n in pageSize" :key="`sk-${n}`">
              <td v-for="column in columns" :key="column.key">
                <JtSkeleton variant="text" width="80%" />
              </td>
              <td v-if="$slots.actions"><JtSkeleton variant="text" width="2rem" /></td>
            </tr>
          </template>

          <template v-else-if="paged.length">
            <tr v-for="(row, index) in paged" :key="rowKey(row, index)">
              <td v-for="column in columns" :key="column.key" :style="{ textAlign: column.align }">
                <slot
                  :name="`cell:${column.key}`"
                  :row="row"
                  :value="row[column.key]"
                  :column="column"
                >
                  {{ formatCellValue(row[column.key], column, row) }}
                </slot>
              </td>
              <td v-if="$slots.actions">
                <div class="jt-table__actions">
                  <slot name="actions" :row="row" :index="index" />
                </div>
              </td>
            </tr>
          </template>

          <tr v-else>
            <td :colspan="colspan" class="jt-table__empty">{{ noDataText }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pagination && !loading" class="jt-table__footer">
      <span class="jt-pagination">{{ rangeText }}</span>
      <JtTablePagination v-model="page" :total-pages="totalPages" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';

import JtSkeleton from '../JtSkeleton/JtSkeleton.vue';
import JtTableFilterCell from '../internal/JtTableFilterCell.vue';
import JtTablePagination from '../internal/JtTablePagination.vue';
import { useTableData } from '@/composables';
import { formatCellValue } from '@/utils';
import type { JtTableColumn } from '@/types';

const props = withDefaults(
  defineProps<{
    columns: JtTableColumn[];
    items?: any[];
    /** Stable row key property. Defaults to `'id'`, falling back to the row index. */
    itemKey?: string;
    /** Show the per-column filter row. Defaults to `true`. */
    filterable?: boolean;
    /** Enable pagination. Defaults to `true`. */
    pagination?: boolean;
    /** Rows per page. Defaults to `10`. */
    pageSize?: number;
    loading?: boolean;
    noDataText?: string;
    actionsLabel?: string;
  }>(),
  {
    items: () => [],
    itemKey: 'id',
    filterable: true,
    pagination: true,
    pageSize: 10,
    noDataText: 'No data',
    actionsLabel: 'Actions',
  },
);

const slots = defineSlots<{
  actions?: (props: { row: any; index: number }) => any;
  [key: `cell:${string}`]: (props: { row: any; value: any; column: JtTableColumn }) => any;
}>();

const columns = toRef(props, 'columns');
const items = toRef(props, 'items');
const pageSize = toRef(props, 'pageSize');

const { filters, sort, page, sorted, paged, totalPages, toggleSort } = useTableData(
  columns,
  items,
  pageSize,
);

const showFilters = computed(
  () => props.filterable && columns.value.some((c) => c.filterable !== false),
);
const colspan = computed(() => columns.value.length + (slots.actions ? 1 : 0));

const isSortable = (column: JtTableColumn): boolean => column.sortable !== false;

function headerStyle(column: JtTableColumn) {
  // Headers stay left-aligned even when cells are aligned otherwise.
  return { width: column.width };
}

function sortIcon(key: string): string {
  if (sort.value.key !== key) return '↕';
  return sort.value.direction === 'asc' ? '▲' : '▼';
}

function rowKey(row: any, index: number): string | number {
  return row?.[props.itemKey] ?? index;
}

const rangeText = computed(() => {
  const total = sorted.value.length;
  if (total === 0) return '0 of 0';
  const current = Math.min(page.value, totalPages.value);
  const start = (current - 1) * pageSize.value + 1;
  const end = Math.min(start + pageSize.value - 1, total);
  return `${start}–${end} of ${total}`;
});
</script>
