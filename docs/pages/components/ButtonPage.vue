<template>
  <DocPage
    eyebrow="Components"
    title="Button"
    lead="Trigger actions with variants, sizes, and a built-in loading state."
  >
    <DocExample :component="Variants" :source="VariantsSrc" title="Variants" />
    <DocExample :component="Sizes" :source="SizesSrc" title="Sizes & disabled" />
    <DocExample
      :component="Loading"
      :source="LoadingSrc"
      title="Loading"
      description="A loading button shows a spinner and blocks clicks."
    />
    <DocApiTable title="Props" :rows="apiProps" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocExample from '../../components/DocExample.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

import Variants from '../../examples/button/Variants.vue';
import VariantsSrc from '../../examples/button/Variants.vue?raw';
import Sizes from '../../examples/button/Sizes.vue';
import SizesSrc from '../../examples/button/Sizes.vue?raw';
import Loading from '../../examples/button/Loading.vue';
import LoadingSrc from '../../examples/button/Loading.vue?raw';

const apiProps: ApiRow[] = [
  {
    name: 'variant',
    type: "'filled' | 'outlined' | 'text'",
    default: "'filled'",
    description: 'Visual style.',
  },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
  { name: 'block', type: 'boolean', default: 'false', description: 'Full-width button.' },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Show a spinner and block clicks.',
  },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button.' },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
    description: 'Native button type.',
  },
];
</script>
