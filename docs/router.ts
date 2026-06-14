import type { RouteRecordRaw } from 'vue-router';

export interface DocNavItem {
  label: string;
  to: string;
}

export interface DocNavSection {
  title: string;
  items: DocNavItem[];
}

/** Sidebar navigation; also the source of truth for routes. */
export const nav: DocNavSection[] = [
  {
    title: 'Getting started',
    items: [
      { label: 'Introduction', to: '/' },
      { label: 'Installation', to: '/installation' },
      { label: 'Theming', to: '/theming' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Forms', to: '/guides/form' },
      { label: 'Layout', to: '/guides/layout' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Button', to: '/components/button' },
      { label: 'Text Field', to: '/components/text-field' },
      { label: 'Select', to: '/components/select' },
      { label: 'Data Table', to: '/components/data-table' },
      { label: 'Dialog', to: '/components/dialog' },
    ],
  },
];

export const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./pages/HomePage.vue') },
  { path: '/installation', component: () => import('./pages/InstallationPage.vue') },
  { path: '/theming', component: () => import('./pages/ThemingPage.vue') },
  { path: '/guides/form', component: () => import('./pages/guides/FormPage.vue') },
  { path: '/guides/layout', component: () => import('./pages/guides/LayoutPage.vue') },
  { path: '/components/button', component: () => import('./pages/components/ButtonPage.vue') },
  {
    path: '/components/text-field',
    component: () => import('./pages/components/TextFieldPage.vue'),
  },
  { path: '/components/select', component: () => import('./pages/components/SelectPage.vue') },
  {
    path: '/components/data-table',
    component: () => import('./pages/components/DataTablePage.vue'),
  },
  { path: '/components/dialog', component: () => import('./pages/components/DialogPage.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];
