<template>
  <div class="doc-stack">
    <JtSelect
      v-model="country"
      label="Country"
      placeholder="Select…"
      :items="countries"
      clearable
    />
    <p style="font-size: 0.8125rem; color: var(--color-jt-muted)">Value: {{ country ?? '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtSelect } from '@james-tanuwidjaja/vue3-components';

const country = ref<unknown>(null);
const countries = [
  { label: 'Indonesia', value: 'ID' },
  { label: 'Singapore', value: 'SG' },
  { label: 'Malaysia', value: 'MY' },
  { label: 'Japan', value: 'JP' },
];
</script>
