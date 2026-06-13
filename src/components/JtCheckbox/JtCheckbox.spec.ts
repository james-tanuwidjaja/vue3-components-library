import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import JtCheckbox from './JtCheckbox.vue';

describe('JtCheckbox', () => {
  it('emits a boolean when toggled', async () => {
    const wrapper = mount(JtCheckbox, { props: { label: 'Accept' } });
    await wrapper.find('input').setValue(true);
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true]);
  });

  it('renders the label', () => {
    const wrapper = mount(JtCheckbox, { props: { label: 'Accept terms' } });
    expect(wrapper.text()).toContain('Accept terms');
  });

  it('shows a validation error on blur', async () => {
    const wrapper = mount(JtCheckbox, {
      props: { rules: [(v: boolean) => v || 'Required'] },
    });
    await wrapper.find('input').trigger('blur');
    expect(wrapper.text()).toContain('Required');
  });

  it('renders a skeleton when loading', () => {
    const wrapper = mount(JtCheckbox, { props: { loading: true } });
    expect(wrapper.find('.jt-skeleton').exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(false);
  });
});
