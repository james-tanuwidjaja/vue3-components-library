<template>
  <div class="doc-row">
    <JtTooltip text="Top tooltip" placement="top">
      <JtButton variant="outlined">Top</JtButton>
    </JtTooltip>
    <JtTooltip text="Right tooltip" placement="right">
      <JtButton variant="outlined">Right</JtButton>
    </JtTooltip>
    <JtTooltip text="Bottom tooltip" placement="bottom">
      <JtButton variant="outlined">Bottom</JtButton>
    </JtTooltip>
  </div>
</template>

<script setup lang="ts">
import { JtTooltip, JtButton } from '@james-tanuwidjaja/vue3-components';
</script>
