import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtSidebar from './JtSidebar.vue';
import JtButton from '../JtButton/JtButton.vue';
import type { JtMenuItem } from '@/types';

const items: JtMenuItem[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard', emoji: '🏠' },
  { key: 'orders', label: 'Orders', href: '/orders', emoji: '📦' },
  {
    key: 'catalog',
    label: 'Catalog',
    emoji: '🗂️',
    children: [
      { key: 'products', label: 'Products', href: '/products', emoji: '🏷️' },
      { key: 'categories', label: 'Categories', href: '/categories', emoji: '📁' },
    ],
  },
  { key: 'reports', label: 'Reports', href: '/reports', emoji: '📊' },
];

const meta: Meta<typeof JtSidebar> = {
  title: 'Layout/JtSidebar',
  component: JtSidebar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JtSidebar>;

/** Standalone sidebar with the three sections; toggle the rail and hover to expand. */
export const Standalone: Story = {
  render: () => ({
    components: { JtSidebar, JtButton },
    setup() {
      const collapsed = ref(false);
      const currentPath = ref('/dashboard');
      const onSelect = (item: JtMenuItem) => {
        if (item.href) currentPath.value = item.href;
      };
      return { items, collapsed, currentPath, onSelect };
    },
    template: `
      <div style="display:flex; height:460px; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
        <JtSidebar
          v-model:collapsed="collapsed"
          :expand-on-hover="true"
          :items="items"
          :current-path="currentPath"
          @select="onSelect"
        >
          <template #top><strong>{{ collapsed ? 'A' : 'Acme' }}</strong></template>
          <template #icon="{ item }">{{ item.emoji }}</template>
          <template #bottom>v0.5.0</template>
        </JtSidebar>
        <div style="padding:1rem;">
          <JtButton size="sm" @click="collapsed = !collapsed">
            {{ collapsed ? 'Expand' : 'Collapse' }}
          </JtButton>
          <p style="font-size:0.8125rem; margin-top:0.5rem;">Active: {{ currentPath }}</p>
        </div>
      </div>
    `,
  }),
};
