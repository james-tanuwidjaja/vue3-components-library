<template>
  <section class="doc-example">
    <h3 v-if="title" :id="anchor" class="doc-example__title">{{ title }}</h3>
    <p v-if="description" class="doc-example__desc">{{ description }}</p>
    <div class="doc-example__preview">
      <component :is="component" />
    </div>
    <DocCode :code="source" :lang="lang" />
  </section>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';

import DocCode from './DocCode.vue';

const props = withDefaults(
  defineProps<{
    component: Component;
    source: string;
    title?: string;
    description?: string;
    lang?: string;
  }>(),
  { lang: 'xml' },
);

const anchor = computed(() =>
  props.title ? props.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined,
);
</script>
