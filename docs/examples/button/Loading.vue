<template>
  <div class="doc-row">
    <JtButton :loading="loading" @click="run">{{ loading ? 'Saving…' : 'Click to load' }}</JtButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtButton } from '@james-tanuwidjaja/vue3-components';

const loading = ref(false);

function run(): void {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1200);
}
</script>
