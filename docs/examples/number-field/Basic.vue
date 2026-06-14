<template>
  <div class="doc-stack">
    <JtNumberField v-model="qty" label="Quantity" :min="0" :max="99" :step="1" />
    <p style="font-size: 0.8125rem; color: var(--color-jt-muted)">Value: {{ qty ?? '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtNumberField } from '@james-tanuwidjaja/vue3-components';

const qty = ref<number | null>(null);
</script>
