<template>
  <div class="doc-stack">
    <JtDatePicker v-model="iso" v-model:formatted="formatted" label="Birth date" clearable />
    <p style="font-size: 0.8125rem; color: var(--color-jt-muted)">
      modelValue: {{ iso ?? '—' }} · formatted: {{ formatted || '—' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtDatePicker } from '@james-tanuwidjaja/vue3-components';

const iso = ref<string | null>(null);
const formatted = ref('');
</script>
