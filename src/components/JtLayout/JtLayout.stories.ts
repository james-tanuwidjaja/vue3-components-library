import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtLayout from './JtLayout.vue';
import JtHeader from '../JtHeader/JtHeader.vue';
import JtSidebar from '../JtSidebar/JtSidebar.vue';
import JtButton from '../JtButton/JtButton.vue';
import type { JtMenuItem } from '@/types';

const items: JtMenuItem[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard', emoji: '🏠' },
  { key: 'orders', label: 'Orders', href: '/orders', emoji: '📦' },
  { key: 'customers', label: 'Customers', href: '/customers', emoji: '👥' },
  {
    key: 'admin',
    label: 'Administration',
    emoji: '🛠️',
    roles: ['admin'],
    children: [
      { key: 'users', label: 'Users', href: '/admin/users', emoji: '👤' },
      { key: 'roles', label: 'Roles', href: '/admin/roles', emoji: '🔑' },
    ],
  },
  { key: 'reports', label: 'Reports', href: '/reports', emoji: '📊' },
];

const meta: Meta<typeof JtLayout> = {
  title: 'Layout/JtLayout',
  component: JtLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof JtLayout>;

/** Full app shell: header with brand/submark, 3-section sidebar, collapsible rail, role filtering. */
export const AppShell: Story = {
  render: () => ({
    components: { JtLayout, JtHeader, JtSidebar, JtButton },
    setup() {
      const collapsed = ref(false);
      const currentPath = ref('/dashboard');
      const isAdmin = ref(true);
      const canAccess = (item: JtMenuItem) =>
        !item.roles || (item.roles as string[]).includes(isAdmin.value ? 'admin' : 'user');
      const onSelect = (item: JtMenuItem) => {
        if (item.href) currentPath.value = item.href;
      };
      return { items, collapsed, currentPath, isAdmin, canAccess, onSelect };
    },
    template: `
      <JtLayout v-model:collapsed="collapsed" :expand-on-hover="true" style="height:520px;">
        <template #header>
          <JtHeader title="Dashboard">
            <template #brand><strong>🏢&nbsp;Acme Admin</strong></template>
            <template #submark><strong>🏢</strong></template>
            <template #actions>
              <label style="font-size:0.8125rem;">
                <input type="checkbox" v-model="isAdmin" /> admin
              </label>
              <JtButton size="sm" variant="text">Sign out</JtButton>
            </template>
          </JtHeader>
        </template>

        <template #sidebar>
          <JtSidebar :items="items" :current-path="currentPath" :can-access="canAccess" @select="onSelect">
            <template #top>
              <strong>{{ collapsed ? '🏢' : '🏢 Acme' }}</strong>
            </template>
            <template #icon="{ item }">{{ item.emoji }}</template>
            <template #bottom>v0.5.0 · © 2026 Acme</template>
          </JtSidebar>
        </template>

        <div style="padding:1.25rem;">
          <h2 style="margin:0 0 0.5rem;">Main content</h2>
          <p style="font-size:0.875rem;">Active route: <code>{{ currentPath }}</code></p>
          <p style="font-size:0.8125rem; color:#6b7280;">
            Toggle the sidebar with the header ☰ button. When collapsed it shows icons only;
            hover the rail to reveal labels. Uncheck "admin" to hide the Administration group.
          </p>
        </div>
      </JtLayout>
    `,
  }),
};
