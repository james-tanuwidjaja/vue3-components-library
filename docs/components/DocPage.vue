<template>
  <article class="doc-page">
    <header class="doc-page__head">
      <p v-if="eyebrow" class="doc-page__eyebrow">{{ eyebrow }}</p>
      <h1 class="doc-page__title">{{ title }}</h1>
      <p v-if="lead" class="doc-page__lead">{{ lead }}</p>
    </header>

    <div class="doc-prose">
      <slot />
    </div>

    <footer class="doc-page__foot">
      <a :href="repoUrl" target="_blank" rel="noopener">Edit on GitHub ↗</a>
    </footer>
  </article>
</template>

<script setup lang="ts">
defineProps<{ title: string; lead?: string; eyebrow?: string }>();

const repoUrl = 'https://github.com/james-tanuwidjaja/vue3-components-library';
</script>
