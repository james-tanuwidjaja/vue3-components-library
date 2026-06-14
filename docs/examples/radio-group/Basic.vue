<template>
  <div class="doc-stack">
    <JtRadioGroup v-model="size" label="Size" :items="items" />
    <p style="font-size: 0.8125rem; color: var(--color-jt-muted)">Value: {{ size ?? '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtRadioGroup } from '@james-tanuwidjaja/vue3-components';

const size = ref<unknown>(null);
const items = [
  { label: 'Small', value: 's' },
  { label: 'Medium', value: 'm' },
  { label: 'Large', value: 'l' },
];
</script>
