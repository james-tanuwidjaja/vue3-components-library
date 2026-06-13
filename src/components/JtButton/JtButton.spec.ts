import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import JtButton from './JtButton.vue';

describe('JtButton', () => {
  it('renders default slot content', () => {
    const wrapper = mount(JtButton, { slots: { default: 'Save' } });
    expect(wrapper.text()).toContain('Save');
  });

  it('emits click', async () => {
    const wrapper = mount(JtButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(JtButton, { props: { disabled: true } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('shows a spinner and blocks interaction when loading', async () => {
    const wrapper = mount(JtButton, { props: { loading: true } });
    expect(wrapper.find('.jt-spinner').exists()).toBe(true);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('applies variant and size classes', () => {
    const wrapper = mount(JtButton, { props: { variant: 'outlined', size: 'lg' } });
    expect(wrapper.classes()).toContain('jt-btn--outlined');
    expect(wrapper.classes()).toContain('jt-btn--lg');
  });
});
