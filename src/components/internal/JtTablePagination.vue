<template>
  <div class="jt-pagination">
    <button
      type="button"
      class="jt-pagination__btn jt-pagination__btn--text"
      :disabled="current <= 1"
      @click="go(1)"
    >
      First
    </button>

    <template v-for="(item, index) in pages" :key="index">
      <span v-if="item === '...'" class="jt-pagination__ellipsis">…</span>
      <button
        v-else
        type="button"
        class="jt-pagination__btn"
        :class="{ 'jt-pagination__btn--active': item === current }"
        @click="go(item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      type="button"
      class="jt-pagination__btn jt-pagination__btn--text"
      :disabled="current >= totalPages"
      @click="go(totalPages)"
    >
      Last
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: number;
  totalPages: number;
}>();

const emit = defineEmits<{ 'update:modelValue': [value: number] }>();

const current = computed(() => Math.min(Math.max(props.modelValue, 1), props.totalPages));

/** Windowed page list: always show first/last and a range around the current page. */
const pages = computed<(number | '...')[]>(() => {
  const total = props.totalPages;
  const cur = current.value;
  const delta = 1;

  if (total <= 1) return [1];

  const range: number[] = [];
  for (let i = Math.max(2, cur - delta); i <= Math.min(total - 1, cur + delta); i++) {
    range.push(i);
  }

  const result: (number | '...')[] = [1];
  if (range[0] > 2) result.push('...');
  result.push(...range);
  if (range[range.length - 1] < total - 1) result.push('...');
  result.push(total);
  return result;
});

function go(page: number): void {
  const next = Math.min(Math.max(page, 1), props.totalPages);
  if (next !== current.value) emit('update:modelValue', next);
}
</script>
