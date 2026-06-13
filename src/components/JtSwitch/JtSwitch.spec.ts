import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import JtSwitch from './JtSwitch.vue';

describe('JtSwitch', () => {
  it('emits a boolean when toggled', async () => {
    const wrapper = mount(JtSwitch, { props: { label: 'Notifications' } });
    await wrapper.find('input').setValue(true);
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true]);
  });

  it('reflects the checked state from modelValue', () => {
    const wrapper = mount(JtSwitch, { props: { modelValue: true } });
    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true);
  });

  it('renders a skeleton when loading', () => {
    const wrapper = mount(JtSwitch, { props: { loading: true } });
    expect(wrapper.find('.jt-skeleton').exists()).toBe(true);
  });
});
