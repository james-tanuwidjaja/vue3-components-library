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
      { label: 'Introduction', to: '/', icon: 'mdi mdi-home-outline' },
      { label: 'Installation', to: '/installation', icon: 'mdi mdi-package-down' },
      { label: 'Theming', to: '/theming', icon: 'mdi mdi-palette-outline' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Forms', to: '/guides/form', icon: 'mdi mdi-form-textbox' },
      { label: 'Layout', to: '/guides/layout', icon: 'mdi mdi-view-dashboard-outline' },
    ],
  },
  {
    title: 'Form inputs',
    items: [
      { label: 'Button', to: '/components/button', icon: 'mdi mdi-gesture-tap-button' },
      { label: 'Text Field', to: '/components/text-field', icon: 'mdi mdi-form-textbox' },
      { label: 'Textarea', to: '/components/textarea', icon: 'mdi mdi-text-box-outline' },
      { label: 'Number Field', to: '/components/number-field', icon: 'mdi mdi-numeric' },
      { label: 'Money Field', to: '/components/money-field', icon: 'mdi mdi-currency-usd' },
      { label: 'Select', to: '/components/select', icon: 'mdi mdi-menu-down-outline' },
    ],
  },
  {
    title: 'Selection controls',
    items: [
      { label: 'Checkbox', to: '/components/checkbox', icon: 'mdi mdi-checkbox-marked-outline' },
      { label: 'Switch', to: '/components/switch', icon: 'mdi mdi-toggle-switch-outline' },
      { label: 'Radio Group', to: '/components/radio-group', icon: 'mdi mdi-radiobox-marked' },
    ],
  },
  {
    title: 'Pickers',
    items: [
      { label: 'Date Picker', to: '/components/date-picker', icon: 'mdi mdi-calendar-outline' },
      {
        label: 'Date Time Picker',
        to: '/components/date-time-picker',
        icon: 'mdi mdi-calendar-clock-outline',
      },
    ],
  },
  {
    title: 'Data',
    items: [
      { label: 'Data Table', to: '/components/data-table', icon: 'mdi mdi-table-large' },
      { label: 'Smart Table', to: '/components/smart-table', icon: 'mdi mdi-table-edit' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { label: 'Dialog', to: '/components/dialog', icon: 'mdi mdi-message-text-outline' },
      { label: 'Tooltip', to: '/components/tooltip', icon: 'mdi mdi-tooltip-text-outline' },
      { label: 'Skeleton', to: '/components/skeleton', icon: 'mdi mdi-image-outline' },
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
