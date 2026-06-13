import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import JtTextField from './JtTextField.vue';
import { required } from '@/constants';

describe('JtTextField', () => {
  it('emits update:modelValue on input', async () => {
    const wrapper = mount(JtTextField);
    await wrapper.find('input').setValue('hello');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['hello']);
  });

  it('shows a validation error on blur when a rule fails', async () => {
    const wrapper = mount(JtTextField, { props: { rules: [required('Required!')] } });
    await wrapper.find('input').trigger('blur');
    expect(wrapper.text()).toContain('Required!');
    expect(wrapper.find('.jt-field__control--error').exists()).toBe(true);
  });

  it('renders a skeleton instead of the input when loading', () => {
    const wrapper = mount(JtTextField, { props: { loading: true } });
    expect(wrapper.find('.jt-skeleton').exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(false);
  });

  it('renders the label and required indicator', () => {
    const wrapper = mount(JtTextField, { props: { label: 'Name', required: true } });
    expect(wrapper.find('label').text()).toContain('Name');
    expect(wrapper.find('.jt-field__required').exists()).toBe(true);
  });
});
