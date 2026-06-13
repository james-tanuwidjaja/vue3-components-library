import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import JtSidebar from './JtSidebar.vue';
import type { JtMenuItem } from '@/types';

const items: JtMenuItem[] = [
  { key: 'home', label: 'Home', href: '/home' },
  { key: 'users', label: 'Users', to: '/users', roles: ['admin'] },
  { key: 'settings', label: 'Settings', children: [{ label: 'Profile', href: '/profile' }] },
];

describe('JtSidebar', () => {
  it('renders a link per top-level item', () => {
    const wrapper = mount(JtSidebar, { props: { items } });
    expect(wrapper.findAll('.jt-menu__link').length).toBe(3);
    expect(wrapper.text()).toContain('Home');
  });

  it('filters items with canAccess (e.g. by role)', () => {
    const wrapper = mount(JtSidebar, {
      props: {
        items,
        canAccess: (i: JtMenuItem) => !i.roles || (i.roles as string[]).includes('viewer'),
      },
    });
    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).not.toContain('Users');
  });

  it('emits select when a leaf item is clicked', async () => {
    const wrapper = mount(JtSidebar, { props: { items } });
    const home = wrapper.findAll('.jt-menu__link').find((l) => l.text().includes('Home'));
    await home!.trigger('click');
    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({ key: 'home' });
  });

  it('renders an anchor with href for href items', () => {
    const wrapper = mount(JtSidebar, { props: { items } });
    const anchors = wrapper.findAll('a.jt-menu__link');
    expect(anchors.some((a) => a.attributes('href') === '/home')).toBe(true);
  });

  it('uses the provided linkComponent for items with `to`', () => {
    const RouterLinkStub = defineComponent({
      props: { to: { type: [String, Object], default: '' } },
      template: '<a class="router-link" :data-to="to"><slot /></a>',
    });
    const wrapper = mount(JtSidebar, { props: { items, linkComponent: RouterLinkStub } });
    const link = wrapper.find('.router-link');
    expect(link.exists()).toBe(true);
    expect(link.attributes('data-to')).toBe('/users');
  });

  it('expands a parent group on click to reveal children', async () => {
    const wrapper = mount(JtSidebar, { props: { items } });
    expect(wrapper.text()).not.toContain('Profile');
    const settings = wrapper.findAll('.jt-menu__link').find((l) => l.text().includes('Settings'));
    await settings!.trigger('click');
    expect(wrapper.text()).toContain('Profile');
  });

  it('applies the rail class when collapsed', () => {
    const wrapper = mount(JtSidebar, { props: { items, collapsed: true } });
    expect(wrapper.find('.jt-sidebar').classes()).toContain('jt-sidebar--rail');
  });

  it('marks the active item from currentPath', () => {
    const wrapper = mount(JtSidebar, { props: { items, currentPath: '/home' } });
    const active = wrapper.find('.jt-menu__link--active');
    expect(active.exists()).toBe(true);
    expect(active.text()).toContain('Home');
  });
});
