<template>
  <DocPage
    eyebrow="Getting started"
    title="Installation"
    lead="Add the package, install the plugin, and import the stylesheet once."
  >
    <h2>1. Install</h2>
    <DocCode :code="installCode" lang="bash" />

    <h2>2. Register the plugin</h2>
    <p>
      Install
      <code>createJt()</code>
      in your app entry. It registers every
      <code>Jt*</code>
      component globally, provides the resolved config, and applies the theme.
    </p>
    <DocCode :code="setupCode" lang="typescript" />

    <h2>3. Import the styles</h2>
    <p>The library ships one precompiled stylesheet — import it once (already shown above):</p>
    <DocCode :code="stylesCode" lang="typescript" />

    <h2>Plugin options</h2>
    <p>Everything is optional and overridable per component.</p>
    <DocCode :code="optionsCode" lang="typescript" />

    <h2>Use a component</h2>
    <DocCode :code="usageCode" lang="xml" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../components/DocPage.vue';
import DocCode from '../components/DocCode.vue';

const installCode = `npm install @james-tanuwidjaja/vue3-components`;

const setupCode = `// main.ts
import { createApp } from 'vue';
import App from './App.vue';

import { createJt } from '@james-tanuwidjaja/vue3-components';
import '@james-tanuwidjaja/vue3-components/styles';

const jt = createJt();

createApp(App).use(jt).mount('#app');`;

const stylesCode = `import '@james-tanuwidjaja/vue3-components/styles';`;

const optionsCode = `createJt({
  theme: {
    defaultTheme: 'light',          // 'light' | 'dark'
    colors: { primary: '#2563eb' }, // any palette key
    radius: '0.5rem',
  },
  locale: {
    dateFormat: 'DD/MM/YYYY',
    money: { thousands: '.', decimal: ',', precision: 2 },
  },
  defaults: {
    global: { density: 'comfortable' },
    JtButton: { size: 'md' },
  },
});`;

const usageCode = `<template>
  <JtButton @click="save">Save</JtButton>
</template>`;
</script>
