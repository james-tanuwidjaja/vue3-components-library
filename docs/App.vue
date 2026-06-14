<template>
  <JtLayout v-model:collapsed="collapsed" :expand-on-hover="true">
    <template #header>
      <JtHeader>
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
        <template #top>
          <RouterLink to="/" class="doc-brand">{{ collapsed ? 'Jt' : 'Jt Components' }}</RouterLink>
        </template>
        <template #bottom>
          <a :href="repoUrl" target="_blank" rel="noopener">GitHub ↗</a>
        </template>
      </JtSidebar>
    </template>

    <div class="doc-main">
      <RouterView />
    </div>

    <template #footer>
      <JtFooter>
        <div class="doc-footer">
          <span>© {{ year }} James Tanuwidjaja · MIT licensed</span>
          <a :href="repoUrl" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
      </JtFooter>
    </template>
  </JtLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

import { JtLayout, JtHeader, JtSidebar, JtFooter } from '@james-tanuwidjaja/vue3-components';
import type { JtMenuItem } from '@james-tanuwidjaja/vue3-components';

import GithubIcon from './components/GithubIcon.vue';
import { nav } from './router';

const repoUrl = 'https://github.com/james-tanuwidjaja/vue3-components-library';
const version = '0.6.0';
const year = new Date().getFullYear();

const route = useRoute();
const collapsed = ref(false);
const dark = ref(false);

const sidebarItems = computed<JtMenuItem[]>(() =>
  nav.flatMap((section) => [
    { type: 'title', label: section.title } as JtMenuItem,
    ...section.items.map((item) => ({ label: item.label, to: item.to, icon: item.icon })),
  ]),
);

function toggleDark(): void {
  dark.value = !dark.value;
  document.documentElement.classList.toggle('jt-theme-dark', dark.value);
}
</script>
