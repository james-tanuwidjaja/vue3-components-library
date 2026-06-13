<template>
  <div class="jt-calendar">
    <div class="jt-calendar__header">
      <button type="button" class="jt-calendar__nav" aria-label="Previous month" @click="prevMonth">
        &lsaquo;
      </button>
      <span class="jt-calendar__title">{{ title }}</span>
      <button type="button" class="jt-calendar__nav" aria-label="Next month" @click="nextMonth">
        &rsaquo;
      </button>
    </div>

    <div class="jt-calendar__grid">
      <span v-for="weekday in weekdays" :key="weekday" class="jt-calendar__weekday">
        {{ weekday }}
      </span>
      <button
        v-for="day in days"
        :key="day.key"
        type="button"
        class="jt-calendar__day"
        :class="{
          'jt-calendar__day--outside': !day.inMonth,
          'jt-calendar__day--today': day.isToday,
          'jt-calendar__day--selected': day.isSelected,
        }"
        :disabled="day.disabled"
        @click="select(day.date)"
      >
        {{ day.label }}
      </button>
    </div>

    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

const props = defineProps<{
  modelValue?: Date | null;
  min?: Date;
  max?: Date;
}>();

const emit = defineEmits<{ 'update:modelValue': [value: Date] }>();

const viewDate = ref<Date>(props.modelValue ?? new Date());

watch(
  () => props.modelValue,
  (value) => {
    if (value) viewDate.value = value;
  },
);

const title = computed(() => format(viewDate.value, 'MMMM yyyy'));

const weekdays = computed(() => {
  const start = startOfWeek(new Date());
  return eachDayOfInterval({ start, end: endOfWeek(new Date()) }).map((d) => format(d, 'EEEEEE'));
});

function isDisabled(date: Date): boolean {
  if (props.min && isBefore(date, startOfDay(props.min))) return true;
  if (props.max && isAfter(date, props.max)) return true;
  return false;
}

const days = computed(() => {
  const monthStart = startOfMonth(viewDate.value);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(endOfMonth(viewDate.value));

  return eachDayOfInterval({ start: gridStart, end: gridEnd }).map((date) => ({
    key: date.toISOString(),
    date,
    label: format(date, 'd'),
    inMonth: isSameMonth(date, viewDate.value),
    isToday: isToday(date),
    isSelected: props.modelValue ? isSameDay(date, props.modelValue) : false,
    disabled: isDisabled(date),
  }));
});

function prevMonth(): void {
  viewDate.value = addMonths(viewDate.value, -1);
}

function nextMonth(): void {
  viewDate.value = addMonths(viewDate.value, 1);
}

function select(date: Date): void {
  if (isDisabled(date)) return;
  emit('update:modelValue', date);
}
</script>
