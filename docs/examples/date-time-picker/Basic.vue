<template>
  <div class="doc-stack">
    <JtDateTimePicker v-model="value" label="Appointment" clearable />
    <p style="font-size: 0.8125rem; color: var(--color-jt-muted)">Value: {{ value ?? '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtDateTimePicker } from '@james-tanuwidjaja/vue3-components';

const value = ref<Date | null>(null);
</script>
