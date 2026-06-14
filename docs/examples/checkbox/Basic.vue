<template>
  <div class="doc-stack">
    <JtCheckbox v-model="accept" label="I accept the terms" />
    <JtCheckbox v-model="news" label="Send me product news" />
    <p style="font-size: 0.8125rem; color: var(--color-jt-muted)">
      accept: {{ accept }} · news: {{ news }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtCheckbox } from '@james-tanuwidjaja/vue3-components';

const accept = ref(false);
const news = ref(true);
</script>
