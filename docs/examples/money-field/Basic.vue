<template>
  <div class="doc-stack">
    <JtMoneyField v-model="amount" label="Amount" prefix="Rp" />
    <JtMoneyField v-model="usd" label="US dollars" prefix="$" thousands="," decimal="." />
    <p style="font-size: 0.8125rem; color: var(--color-jt-muted)">
      Raw values: {{ amount ?? '—' }} / {{ usd ?? '—' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtMoneyField } from '@james-tanuwidjaja/vue3-components';

const amount = ref<number | null>(1234567.5);
const usd = ref<number | null>(1234.5);
</script>
