<template>
  <JtLayout v-model:collapsed="collapsed" :expand-on-hover="true">
    <template #header>
      <JtHeader>
        <template #brand>
          <RouterLink to="/" class="doc-brand">Jt&nbsp;Components</RouterLink>
        </template>
        <template #submark>
          <RouterLink to="/" class="doc-brand">Jt</RouterLink>
        </template>
        <template #actions>
          <span class="doc-version">v{{ version }}</span>
          <button
            type="button"
            class="doc-icon-btn"
            :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleDark"
          >
            {{ dark ? '☀︎' : '☾' }}
          </button>
          <a
            class="doc-icon-btn"
            :href="repoUrl"
            target="_blank"
            rel="noopener"
            aria-label="GitHub repository"
          >
            <GithubIcon />
          </a>
        </template>
      </JtHeader>
    </template>

    <template #sidebar>
      <JtSidebar :items="sidebarItems" :link-component="RouterLink" :current-path="route.path">
        <template #bottom>
          <a :href="repoUrl" target="_blank" rel="noopener">GitHub ↗</a>
          <div>MIT licensed</div>
        </template>
      </JtSidebar>
    </template>

    <div class="doc-main">
      <RouterView />
    </div>
  </JtLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

import { JtLayout, JtHeader, JtSidebar } from '@james-tanuwidjaja/vue3-components';
import type { JtMenuItem } from '@james-tanuwidjaja/vue3-components';

import GithubIcon from './components/GithubIcon.vue';
import { nav } from './router';

const repoUrl = 'https://github.com/james-tanuwidjaja/vue3-components-library';
const version = '0.5.1';

const route = useRoute();
const collapsed = ref(false);
const dark = ref(false);

const sidebarItems = computed<JtMenuItem[]>(() =>
  nav.flatMap((section) => [
    { type: 'title', label: section.title } as JtMenuItem,
    ...section.items.map((item) => ({ label: item.label, to: item.to })),
  ]),
);

function toggleDark(): void {
  dark.value = !dark.value;
  document.documentElement.classList.toggle('jt-theme-dark', dark.value);
}
</script>
