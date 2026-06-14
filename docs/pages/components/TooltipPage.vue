<template>
  <DocPage
    eyebrow="Feedback"
    title="Tooltip"
    lead="A floating tooltip shown on hover/focus, positioned with Floating UI."
  >
    <DocExample
      :component="Basic"
      :source="BasicSrc"
      title="Placements"
      description="Wrap any trigger; the tooltip flips to stay in view."
    />
    <DocApiTable title="Props" :rows="apiProps" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Basic from '../../examples/tooltip/Basic.vue';
import BasicSrc from '../../examples/tooltip/Basic.vue?raw';

const apiProps: ApiRow[] = [
  { name: 'text', type: 'string', description: 'Tooltip text (or use the #content slot).' },
  {
    name: 'placement',
    type: "'top' | 'bottom' | 'left' | 'right' | …",
    default: "'top'",
    description: 'Preferred placement.',
  },
  { name: 'offset', type: 'number', default: '6', description: 'Distance from the trigger.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the tooltip.' },
];
</script>
