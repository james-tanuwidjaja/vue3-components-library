<template>
  <DocPage
    eyebrow="Guides"
    title="Layout"
    lead="JtLayout, JtHeader, and JtSidebar compose an app shell — this very site is built with them."
  >
    <p>
      <code>JtLayout</code>
      is a CSS-grid shell (sidebar full height on the left, header beside it, main content). It owns
      the sidebar collapsed state and shares it, so
      <code>JtHeader</code>
      can swap its brand for a submark when minimized.
    </p>
    <DocCode :code="shellCode" lang="xml" />

    <h2>Menu items</h2>
    <p>
      The sidebar menu is array-driven. Items with
      <code>to</code>
      render via your
      <code>linkComponent</code>
      (e.g.
      <code>RouterLink</code>
      );
      <code>href</code>
      renders an anchor; both emit
      <code>select</code>
      .
      <code>children</code>
      makes an expandable group, and
      <code>type: 'title'</code>
      /
      <code>'divider'</code>
      add non-clickable section captions.
    </p>
    <DocCode :code="itemsCode" lang="typescript" />

    <h2>Permissions</h2>
    <p>
      Pass a single
      <code>canAccess(item)</code>
      predicate; it filters items and their children recursively.
    </p>
    <DocCode :code="permsCode" lang="typescript" />

    <h2>Minimize behavior</h2>
    <p>
      Collapsed shows icons only (rail); with
      <code>expand-on-hover</code>
      , hovering the rail expands it over the content to reveal labels. Try the ☰ button in the
      header.
    </p>

    <DocApiTable title="JtSidebar props" :rows="api" />
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../../components/DocPage.vue';
import DocCode from '../../components/DocCode.vue';
import DocApiTable from '../../components/DocApiTable.vue';
import type { ApiRow } from '../../types';

const shellCode = `<!-- Pinned shell: header + sidebar stay put, only the main area scrolls. -->
<JtLayout v-model:collapsed="collapsed" :expand-on-hover="true">
  <template #header>
    <JtHeader />
  </template>

  <template #sidebar>
    <JtSidebar
      :items="items"
      :can-access="canAccess"
      :link-component="RouterLink"
      :current-path="$route.path"
    >
      <template #top>Acme</template>
      <template #bottom>v1.0.0</template>
    </JtSidebar>
  </template>

  <RouterView />

  <!-- Static by default; add \`fixed-footer\` on JtLayout to pin it. -->
  <template #footer>
    <JtFooter>© 2026 Acme · MIT</JtFooter>
  </template>
</JtLayout>`;

const itemsCode = `const items: JtMenuItem[] = [
  { type: 'title', label: 'Main' },
  { label: 'Dashboard', to: '/dashboard', icon: 'mdi mdi-home' },
  { label: 'Orders', to: '/orders' },
  { type: 'divider', label: '' },
  {
    label: 'Administration',
    roles: ['admin'],
    children: [
      { label: 'Users', to: '/admin/users' },
      { label: 'Roles', to: '/admin/roles' },
    ],
  },
];`;

const permsCode = `const userRoles = ['admin'];
const canAccess = (item: JtMenuItem) =>
  !item.roles || (item.roles as string[]).some((r) => userRoles.includes(r));`;

const api: ApiRow[] = [
  {
    name: 'items',
    type: 'JtMenuItem[]',
    default: '[]',
    description: 'Menu items for the middle section.',
  },
  { name: 'canAccess', type: '(item) => boolean', description: 'Filter items and children.' },
  {
    name: 'linkComponent',
    type: 'string | Component',
    default: "'a'",
    description: 'Component used for items with `to`.',
  },
  { name: 'currentPath', type: 'string', description: 'Marks the active item.' },
  { name: 'collapsed', type: 'boolean', description: 'Rail state (standalone v-model).' },
  {
    name: 'expandOnHover',
    type: 'boolean',
    default: 'false',
    description: 'Expand rail on hover.',
  },
];
</script>
