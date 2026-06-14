<template>
  <div>
    <section class="doc-hero">
      <h1 class="doc-hero__title">Jt Components</h1>
      <p class="doc-hero__lead">
        A reusable Vue 3 component library with a single
        <code>createJt()</code>
        plugin, precompiled CSS, configurable theming, built-in form validation, data tables, and
        layout primitives.
      </p>
      <div class="doc-hero__actions">
        <JtButton size="lg" @click="router.push('/installation')">Get started</JtButton>
        <JtButton size="lg" variant="outlined" @click="open(repoUrl)">View on GitHub</JtButton>
      </div>
    </section>

    <div class="doc-features">
      <div class="doc-feature">
        <h3>Install once</h3>
        <p>
          Register everything with
          <code>app.use(createJt())</code>
          in your app entry.
        </p>
      </div>
      <div class="doc-feature">
        <h3>Precompiled CSS</h3>
        <p>Import one stylesheet. No Tailwind setup required in your app.</p>
      </div>
      <div class="doc-feature">
        <h3>Forms &amp; validation</h3>
        <p>Rules, reset-to-initial, and dirty detection out of the box.</p>
      </div>
      <div class="doc-feature">
        <h3>Data tables</h3>
        <p>Type-aware filters, sorting, pagination, and inline editing.</p>
      </div>
      <div class="doc-feature">
        <h3>Promise dialogs</h3>
        <p>
          <code>await openDialog(...)</code>
          — even modal-on-modal stacking.
        </p>
      </div>
      <div class="doc-feature">
        <h3>Layout primitives</h3>
        <p>Header, collapsible sidebar with a permission-aware menu.</p>
      </div>
    </div>

    <p style="font-size: 0.875rem; color: var(--color-jt-muted)">
      This very site is built with the library's own components.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { JtButton } from '@james-tanuwidjaja/vue3-components';

const router = useRouter();
const repoUrl = 'https://github.com/james-tanuwidjaja/vue3-components-library';

function open(url: string): void {
  window.open(url, '_blank', 'noopener');
}
</script>
