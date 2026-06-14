<template>
  <div class="doc-stack">
    <JtTextarea v-model="text" label="Description" placeholder="Tell us more…" :rows="4" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtTextarea } from '@james-tanuwidjaja/vue3-components';

const text = ref('');
</script>
