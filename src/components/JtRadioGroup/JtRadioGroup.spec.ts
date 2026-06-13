import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import JtRadioGroup from './JtRadioGroup.vue';

const items = [
  { label: 'Small', value: 's' },
  { label: 'Medium', value: 'm' },
  { label: 'Large', value: 'l' },
];

describe('JtRadioGroup', () => {
  it('renders a radio per item', () => {
    const wrapper = mount(JtRadioGroup, { props: { items } });
    expect(wrapper.findAll('input[type="radio"]')).toHaveLength(3);
  });

  it('emits the selected value', async () => {
    const wrapper = mount(JtRadioGroup, { props: { items } });
    await wrapper.findAll('input[type="radio"]')[1].trigger('change');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['m']);
  });

  it('reflects the selected item from modelValue', () => {
    const wrapper = mount(JtRadioGroup, { props: { items, modelValue: 'l' } });
    const radios = wrapper.findAll('input[type="radio"]');
    expect((radios[2].element as HTMLInputElement).checked).toBe(true);
  });

  it('supports object values', async () => {
    const objItems = [
      { id: 1, name: 'One' },
      { id: 2, name: 'Two' },
    ];
    const wrapper = mount(JtRadioGroup, {
      props: { items: objItems, itemValue: (i: any) => i, itemLabel: 'name' },
    });
    await wrapper.findAll('input[type="radio"]')[0].trigger('change');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([{ id: 1, name: 'One' }]);
  });
});
