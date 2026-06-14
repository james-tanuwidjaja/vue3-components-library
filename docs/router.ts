import type { RouteRecordRaw } from 'vue-router';

export interface DocNavItem {
  label: string;
  to: string;
  icon: string;
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
      { label: 'Introduction', to: '/', icon: '🏠' },
      { label: 'Installation', to: '/installation', icon: '📦' },
      { label: 'Theming', to: '/theming', icon: '🎨' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Forms', to: '/guides/form', icon: '📝' },
      { label: 'Layout', to: '/guides/layout', icon: '🧱' },
    ],
  },
  {
    title: 'Form inputs',
    items: [
      { label: 'Button', to: '/components/button', icon: '🔘' },
      { label: 'Text Field', to: '/components/text-field', icon: '✏️' },
      { label: 'Textarea', to: '/components/textarea', icon: '📄' },
      { label: 'Number Field', to: '/components/number-field', icon: '🔢' },
      { label: 'Money Field', to: '/components/money-field', icon: '💰' },
      { label: 'Select', to: '/components/select', icon: '🔽' },
    ],
  },
  {
    title: 'Selection controls',
    items: [
      { label: 'Checkbox', to: '/components/checkbox', icon: '☑️' },
      { label: 'Switch', to: '/components/switch', icon: '🎚️' },
      { label: 'Radio Group', to: '/components/radio-group', icon: '🔘' },
    ],
  },
  {
    title: 'Pickers',
    items: [
      { label: 'Date Picker', to: '/components/date-picker', icon: '📅' },
      { label: 'Date Time Picker', to: '/components/date-time-picker', icon: '🕐' },
    ],
  },
  {
    title: 'Data',
    items: [
      { label: 'Data Table', to: '/components/data-table', icon: '📊' },
      { label: 'Smart Table', to: '/components/smart-table', icon: '🧮' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { label: 'Dialog', to: '/components/dialog', icon: '💬' },
      { label: 'Tooltip', to: '/components/tooltip', icon: '💡' },
      { label: 'Skeleton', to: '/components/skeleton', icon: '💀' },
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
  { path: '/components/textarea', component: () => import('./pages/components/TextareaPage.vue') },
  {
    path: '/components/number-field',
    component: () => import('./pages/components/NumberFieldPage.vue'),
  },
  {
    path: '/components/money-field',
    component: () => import('./pages/components/MoneyFieldPage.vue'),
  },
  { path: '/components/select', component: () => import('./pages/components/SelectPage.vue') },
  { path: '/components/checkbox', component: () => import('./pages/components/CheckboxPage.vue') },
  { path: '/components/switch', component: () => import('./pages/components/SwitchPage.vue') },
  {
    path: '/components/radio-group',
    component: () => import('./pages/components/RadioGroupPage.vue'),
  },
  {
    path: '/components/date-picker',
    component: () => import('./pages/components/DatePickerPage.vue'),
  },
  {
    path: '/components/date-time-picker',
    component: () => import('./pages/components/DateTimePickerPage.vue'),
  },
  {
    path: '/components/data-table',
    component: () => import('./pages/components/DataTablePage.vue'),
  },
  {
    path: '/components/smart-table',
    component: () => import('./pages/components/SmartTablePage.vue'),
  },
  { path: '/components/dialog', component: () => import('./pages/components/DialogPage.vue') },
  { path: '/components/tooltip', component: () => import('./pages/components/TooltipPage.vue') },
  { path: '/components/skeleton', component: () => import('./pages/components/SkeletonPage.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];
