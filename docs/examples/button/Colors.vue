<template>
  <div class="doc-stack">
    <div class="doc-row">
      <JtButton>Primary</JtButton>
      <JtButton color="secondary">Secondary</JtButton>
      <JtButton color="success">Success</JtButton>
      <JtButton color="danger">Danger</JtButton>
      <JtButton color="warning">Warning</JtButton>
      <JtButton color="info">Info</JtButton>
    </div>
    <div class="doc-row">
      <JtButton variant="outlined">Primary</JtButton>
      <JtButton variant="outlined" color="secondary">Secondary</JtButton>
      <JtButton variant="outlined" color="success">Success</JtButton>
      <JtButton variant="outlined" color="danger">Danger</JtButton>
      <JtButton variant="outlined" color="warning">Warning</JtButton>
      <JtButton variant="outlined" color="info">Info</JtButton>
    </div>
    <div class="doc-row">
      <JtButton variant="text">Primary</JtButton>
      <JtButton variant="text" color="secondary">Secondary</JtButton>
      <JtButton variant="text" color="success">Success</JtButton>
      <JtButton variant="text" color="danger">Danger</JtButton>
      <JtButton variant="text" color="warning">Warning</JtButton>
      <JtButton variant="text" color="info">Info</JtButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JtButton } from '@james-tanuwidjaja/vue3-components';
</script>
