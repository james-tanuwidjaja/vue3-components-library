import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import JtMoneyField from './JtMoneyField.vue';

describe('JtMoneyField', () => {
  it('formats the initial value with default separators', () => {
    const wrapper = mount(JtMoneyField, { props: { modelValue: 1234567.5 } });
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('1.234.567,50');
  });

  it('emits the raw number while typing', async () => {
    const wrapper = mount(JtMoneyField);
    await wrapper.find('input').setValue('1234,5');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1234.5]);
  });

  it('groups thousands live in the display', async () => {
    const wrapper = mount(JtMoneyField);
    const input = wrapper.find('input');
    await input.setValue('1234567');
    expect((input.element as HTMLInputElement).value).toBe('1.234.567');
  });

  it('respects custom separators via props', () => {
    const wrapper = mount(JtMoneyField, {
      props: { modelValue: 1234.5, thousands: ',', decimal: '.' },
    });
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('1,234.50');
  });
});
