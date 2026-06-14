<template>
  <div class="doc-stack" style="max-width: 26rem">
    <div class="doc-row">
      <JtSkeleton variant="circle" width="3rem" height="3rem" />
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem">
        <JtSkeleton variant="text" width="80%" />
        <JtSkeleton variant="text" width="60%" />
      </div>
    </div>
    <JtSkeleton variant="rect" width="100%" height="6rem" />
  </div>
</template>

<script setup lang="ts">
import { JtSkeleton } from '@james-tanuwidjaja/vue3-components';
</script>
