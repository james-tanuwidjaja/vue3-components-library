<template>
  <div class="doc-stack">
    <JtTextField v-model="name" label="Full name" placeholder="Jane Doe" hint="As on your ID" />
    <p style="font-size: 0.8125rem; color: var(--color-jt-muted)">Value: {{ name || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtTextField } from '@james-tanuwidjaja/vue3-components';

const name = ref('');
</script>
