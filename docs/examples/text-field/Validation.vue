<template>
  <div class="doc-stack">
    <JtTextField
      v-model="email"
      label="Email"
      placeholder="you@example.com"
      required
      :rules="[required(), emailRule()]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtTextField, required, email as emailRule } from '@james-tanuwidjaja/vue3-components';

const email = ref('');
</script>
