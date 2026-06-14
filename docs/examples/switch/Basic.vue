<template>
  <div class="doc-stack">
    <JtSwitch v-model="notify" label="Enable notifications" />
    <JtSwitch v-model="beta" label="Join the beta" />
    <p style="font-size: 0.8125rem; color: var(--color-jt-muted)">
      notify: {{ notify }} · beta: {{ beta }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtSwitch } from '@james-tanuwidjaja/vue3-components';

const notify = ref(true);
const beta = ref(false);
</script>
