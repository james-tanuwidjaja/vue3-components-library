<template>
  <div class="doc-stack">
    <JtSelect
      v-model="tags"
      label="Tags"
      placeholder="Pick several…"
      :items="options"
      multiple
      clearable
    />
    <p style="font-size: 0.8125rem; color: var(--color-jt-muted)">Selected: {{ tags }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtSelect } from '@james-tanuwidjaja/vue3-components';

const tags = ref<unknown[]>([]);
const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Vite', value: 'vite' },
  { label: 'Tailwind', value: 'tw' },
];
</script>
