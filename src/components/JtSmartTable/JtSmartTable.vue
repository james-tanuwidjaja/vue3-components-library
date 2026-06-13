<template>
  <div class="jt-smarttable">
    <div v-if="addable" class="jt-table__footer" style="justify-content: flex-end">
      <JtButton size="sm" :disabled="isEditing" @click="startAdd">{{ addLabel }}</JtButton>
    </div>

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
            <th style="width: 1%">{{ actionsLabel }}</th>
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
            <td></td>
          </tr>
        </thead>

        <tbody>
          <!-- Add row -->
          <tr v-if="isAdding">
            <td v-for="column in columns" :key="column.key">
              <JtTableEditCell
                v-if="column.editable !== false"
                :column="column"
                :model-value="draft[column.key]"
                :error="errors[column.key]"
                @update:model-value="draft[column.key] = $event"
              />
            </td>
            <td>
              <div class="jt-table__actions">
                <JtButton size="sm" @click="save">{{ saveLabel }}</JtButton>
                <JtButton size="sm" variant="text" @click="cancel">{{ cancelLabel }}</JtButton>
              </div>
            </td>
          </tr>

          <template v-if="loading">
            <tr v-for="n in pageSize" :key="`sk-${n}`">
              <td v-for="column in columns" :key="column.key">
                <JtSkeleton variant="text" width="80%" />
              </td>
              <td><JtSkeleton variant="text" width="3rem" /></td>
            </tr>
          </template>

          <template v-else-if="paged.length">
            <tr v-for="(row, index) in paged" :key="rowKey(row, index)">
              <template v-if="editingKey === rowKey(row, index)">
                <td v-for="column in columns" :key="column.key">
                  <JtTableEditCell
                    v-if="column.editable !== false"
                    :column="column"
                    :model-value="draft[column.key]"
                    :error="errors[column.key]"
                    @update:model-value="draft[column.key] = $event"
                  />
                  <template v-else>{{ formatCellValue(row[column.key], column, row) }}</template>
                </td>
                <td>
                  <div class="jt-table__actions">
                    <JtButton size="sm" @click="save">{{ saveLabel }}</JtButton>
                    <JtButton size="sm" variant="text" @click="cancel">{{ cancelLabel }}</JtButton>
                  </div>
                </td>
              </template>

              <template v-else>
                <td
                  v-for="column in columns"
                  :key="column.key"
                  :style="{ textAlign: column.align }"
                >
                  <slot
                    :name="`cell:${column.key}`"
                    :row="row"
                    :value="row[column.key]"
                    :column="column"
                  >
                    {{ formatCellValue(row[column.key], column, row) }}
                  </slot>
                </td>
                <td>
                  <div class="jt-table__actions">
                    <JtButton
                      v-if="editable"
                      size="sm"
                      variant="text"
                      :disabled="isEditing"
                      @click="startEdit(row, index)"
                    >
                      {{ editLabel }}
                    </JtButton>
                    <JtButton
                      v-if="deletable"
                      size="sm"
                      variant="text"
                      :disabled="isEditing"
                      @click="remove(row)"
                    >
                      {{ deleteLabel }}
                    </JtButton>
                  </div>
                </td>
              </template>
            </tr>
          </template>

          <tr v-else-if="!isAdding">
            <td :colspan="columns.length + 1" class="jt-table__empty">{{ noDataText }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pagination && !loading" class="jt-table__footer">
      <span class="jt-pagination">{{ rangeText }}</span>
      <div class="jt-pagination">
        <button
          class="jt-pagination__btn"
          :disabled="page <= 1"
          aria-label="Previous page"
          @click="page--"
        >
          &lsaquo;
        </button>
        <span>{{ Math.min(page, totalPages) }} / {{ totalPages }}</span>
        <button
          class="jt-pagination__btn"
          :disabled="page >= totalPages"
          aria-label="Next page"
          @click="page++"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRef } from 'vue';

import JtButton from '../JtButton/JtButton.vue';
import JtSkeleton from '../JtSkeleton/JtSkeleton.vue';
import JtTableFilterCell from '../internal/JtTableFilterCell.vue';
import JtTableEditCell from '../internal/JtTableEditCell.vue';
import { useTableData } from '@/composables';
import { deepClone, formatCellValue } from '@/utils';
import type { JtTableColumn } from '@/types';

const props = withDefaults(
  defineProps<{
    columns: JtTableColumn[];
    items?: any[];
    itemKey?: string;
    filterable?: boolean;
    pagination?: boolean;
    pageSize?: number;
    loading?: boolean;
    addable?: boolean;
    editable?: boolean;
    deletable?: boolean;
    noDataText?: string;
    actionsLabel?: string;
    addLabel?: string;
    editLabel?: string;
    deleteLabel?: string;
    saveLabel?: string;
    cancelLabel?: string;
  }>(),
  {
    items: () => [],
    itemKey: 'id',
    filterable: true,
    pagination: true,
    pageSize: 10,
    addable: true,
    editable: true,
    deletable: true,
    noDataText: 'No data',
    actionsLabel: 'Actions',
    addLabel: '+ Add',
    editLabel: 'Edit',
    deleteLabel: 'Delete',
    saveLabel: 'Save',
    cancelLabel: 'Cancel',
  },
);

const emit = defineEmits<{
  'update:items': [items: any[]];
  add: [row: any];
  update: [row: any];
  delete: [row: any];
}>();

const columns = toRef(props, 'columns');
const items = toRef(props, 'items');
const pageSize = toRef(props, 'pageSize');

const { filters, sort, page, sorted, paged, totalPages, toggleSort } = useTableData(
  columns,
  items,
  pageSize,
);

const editingKey = ref<string | number | null>(null);
const isAdding = ref(false);
const draft = reactive<Record<string, any>>({});
const errors = reactive<Record<string, string>>({});

const isEditing = computed(() => editingKey.value !== null || isAdding.value);
const showFilters = computed(
  () => props.filterable && columns.value.some((c) => c.filterable !== false),
);

const isSortable = (column: JtTableColumn): boolean => column.sortable !== false;

function headerStyle(column: JtTableColumn) {
  return { width: column.width, textAlign: column.align };
}

function sortIcon(key: string): string {
  if (sort.value.key !== key) return '↕';
  return sort.value.direction === 'asc' ? '▲' : '▼';
}

function rowKey(row: any, index: number): string | number {
  return row?.[props.itemKey] ?? index;
}

function resetDraft(source: Record<string, any>): void {
  Object.keys(draft).forEach((key) => delete draft[key]);
  Object.assign(draft, deepClone(source));
  Object.keys(errors).forEach((key) => delete errors[key]);
}

function emptyRow(): Record<string, any> {
  const row: Record<string, any> = {};
  for (const column of columns.value) {
    row[column.key] = column.type === 'boolean' ? false : null;
  }
  return row;
}

function startAdd(): void {
  isAdding.value = true;
  editingKey.value = null;
  resetDraft(emptyRow());
}

function startEdit(row: any, index: number): void {
  isAdding.value = false;
  editingKey.value = rowKey(row, index);
  resetDraft(row);
}

function cancel(): void {
  editingKey.value = null;
  isAdding.value = false;
}

function validateDraft(): boolean {
  let valid = true;
  for (const column of columns.value) {
    if (column.editable === false) continue;
    let message = '';
    for (const rule of column.rules ?? []) {
      const result = rule(draft[column.key]);
      if (result !== true) {
        message = result;
        valid = false;
        break;
      }
    }
    errors[column.key] = message;
  }
  return valid;
}

function save(): void {
  if (!validateDraft()) return;
  const snapshot = deepClone(draft);

  if (isAdding.value) {
    emit('update:items', [...props.items, snapshot]);
    emit('add', snapshot);
  } else {
    const next = props.items.map((row, index) =>
      rowKey(row, index) === editingKey.value ? { ...row, ...snapshot } : row,
    );
    emit('update:items', next);
    emit('update', snapshot);
  }
  cancel();
}

function remove(row: any): void {
  const key = row?.[props.itemKey];
  const next =
    key != null
      ? props.items.filter((candidate) => candidate?.[props.itemKey] !== key)
      : props.items.filter((candidate) => candidate !== row);
  emit('update:items', next);
  emit('delete', row);
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
