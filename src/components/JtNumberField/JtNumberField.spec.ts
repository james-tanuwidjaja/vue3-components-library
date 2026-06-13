import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import JtNumberField from './JtNumberField.vue';

describe('JtNumberField', () => {
  it('emits a parsed number on input', async () => {
    const wrapper = mount(JtNumberField);
    await wrapper.find('input').setValue('42');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([42]);
  });

  it('emits null when cleared', async () => {
    const wrapper = mount(JtNumberField, { props: { modelValue: 5 } });
    await wrapper.find('input').setValue('');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([null]);
  });

  it('renders a skeleton when loading', () => {
    const wrapper = mount(JtNumberField, { props: { loading: true } });
    expect(wrapper.find('.jt-skeleton').exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(false);
  });
});
