<template>
  <DocPage
    eyebrow="Feedback"
    title="Skeleton"
    lead="The loading placeholder primitive used by every field's loading state — usable on its own."
  >
    <DocExample :component="Basic" :source="BasicSrc" title="Variants" />
    <DocApiTable title="Props" :rows="apiProps" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/skeleton/Basic.vue';
import BasicSrc from '../../examples/skeleton/Basic.vue?raw';

const apiProps: ApiRow[] = [
  {
    name: 'variant',
    type: "'text' | 'rect' | 'circle'",
    default: "'rect'",
    description: 'Placeholder shape.',
  },
  { name: 'width', type: 'string | number', description: 'CSS width (number is px).' },
  { name: 'height', type: 'string | number', description: 'CSS height (number is px).' },
  { name: 'rounded', type: 'string', description: 'Override border radius.' },
];
</script>
