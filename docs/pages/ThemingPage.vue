<template>
  <DocPage
    eyebrow="Getting started"
    title="Theming"
    lead="Theme colors are CSS variables written by createJt() — configurable at install or at runtime."
  >
    <h2>Configure at install</h2>
    <DocCode :code="configCode" lang="typescript" />

    <h2>Dark mode</h2>
    <p>
      Set
      <code>defaultTheme: 'dark'</code>
      , or toggle the
      <code>jt-theme-dark</code>
      class on
      <code>&lt;html&gt;</code>
      . The ☾/☀︎ button in this site's header does exactly that.
    </p>
    <DocCode :code="darkCode" lang="typescript" />

    <h2>Runtime color override</h2>
    <p>
      Pick a color to update
      <code>--jt-primary</code>
      live:
    </p>
    <div class="doc-example__preview doc-row">
      <input type="color" :value="primary" @input="apply" />
      <JtButton>Primary</JtButton>
      <JtButton variant="outlined">Outlined</JtButton>
      <JtButton variant="text">Text</JtButton>
    </div>
    <DocCode :code="runtimeCode" lang="typescript" />

    <DocApiTable title="Color tokens" :rows="tokens" />
  </DocPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { JtButton } from '@james-tanuwidjaja/vue3-components';

import DocPage from '../components/DocPage.vue';
import DocCode from '../components/DocCode.vue';
import DocApiTable from '../components/DocApiTable.vue';
import type { ApiRow } from '../types';

const primary = ref('#2563eb');

function apply(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  primary.value = value;
  document.documentElement.style.setProperty('--jt-primary', value);
  document.documentElement.style.setProperty('--jt-primary-hover', value);
}

const configCode = `createJt({
  theme: {
    defaultTheme: 'light',
    colors: { primary: '#16a34a', error: '#dc2626' },
    radius: '0.75rem',
  },
});`;

const darkCode = `// at install
createJt({ theme: { defaultTheme: 'dark' } });

// or toggle at runtime
document.documentElement.classList.toggle('jt-theme-dark');`;

const runtimeCode = `document.documentElement.style.setProperty('--jt-primary', '#9333ea');`;

const tokens: ApiRow[] = [
  { name: 'primary', type: 'color', default: '#2563eb', description: 'Brand / primary color.' },
  { name: 'primaryHover', type: 'color', default: '#1d4ed8', description: 'Primary hover state.' },
  { name: 'onPrimary', type: 'color', default: '#ffffff', description: 'Text on primary.' },
  { name: 'surface', type: 'color', default: '#ffffff', description: 'Surface / background.' },
  { name: 'surfaceMuted', type: 'color', default: '#f3f4f6', description: 'Muted surface.' },
  { name: 'onSurface', type: 'color', default: '#1f2937', description: 'Text on surface.' },
  { name: 'border', type: 'color', default: '#d1d5db', description: 'Border color.' },
  { name: 'muted', type: 'color', default: '#6b7280', description: 'Muted text.' },
  { name: 'error', type: 'color', default: '#dc2626', description: 'Error color.' },
  { name: 'success', type: 'color', default: '#16a34a', description: 'Success color.' },
  { name: 'warning', type: 'color', default: '#d97706', description: 'Warning color.' },
];
</script>
