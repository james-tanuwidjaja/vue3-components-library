import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import JtSelect from './JtSelect.vue';

const fruits = [
  { label: 'Apple', value: 'a' },
  { label: 'Banana', value: 'b' },
  { label: 'Cherry', value: 'c' },
];

afterEach(() => {
  document.body.innerHTML = '';
});

describe('JtSelect', () => {
  it('opens and lists options, emitting the selected value', async () => {
    const wrapper = mount(JtSelect, { props: { items: fruits }, attachTo: document.body });

    await wrapper.find('.jt-field__control').trigger('click');
    await nextTick();

    const options = document.querySelectorAll('.jt-select__option');
    expect(options.length).toBe(3);

    (options[1] as HTMLElement).click();
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['b']);

    wrapper.unmount();
  });

  it('filters options by the search query', async () => {
    const wrapper = mount(JtSelect, { props: { items: fruits }, attachTo: document.body });

    await wrapper.find('.jt-field__control').trigger('click');
    await nextTick();
    await wrapper.find('.jt-select__search').setValue('ban');

    const labels = [...document.querySelectorAll('.jt-select__option')].map((el) =>
      el.textContent?.trim(),
    );
    expect(labels).toEqual(['Banana']);

    wrapper.unmount();
  });

  it('supports object values', async () => {
    const items = [
      { id: 1, name: 'One' },
      { id: 2, name: 'Two' },
    ];
    const wrapper = mount(JtSelect, {
      props: { items, itemValue: (i: any) => i, itemLabel: 'name' },
      attachTo: document.body,
    });

    await wrapper.find('.jt-field__control').trigger('click');
    await nextTick();
    (document.querySelectorAll('.jt-select__option')[0] as HTMLElement).click();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([{ id: 1, name: 'One' }]);
    wrapper.unmount();
  });

  it('displays the selected label', () => {
    const wrapper = mount(JtSelect, { props: { items: fruits, modelValue: 'c' } });
    expect(wrapper.find('.jt-field__trigger-value').text()).toBe('Cherry');
  });

  it('toggles values as an array in multiple mode and keeps the menu open', async () => {
    const wrapper = mount(JtSelect, {
      props: { items: fruits, multiple: true, modelValue: [] },
      attachTo: document.body,
    });

    await wrapper.find('.jt-field__control').trigger('click');
    await nextTick();
    (document.querySelectorAll('.jt-select__option')[0] as HTMLElement).click();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['a']]);
    // Menu remains open for further selection.
    expect(document.querySelectorAll('.jt-select__option').length).toBe(3);

    wrapper.unmount();
  });

  it('renders chips for selected values in multiple mode', () => {
    const wrapper = mount(JtSelect, {
      props: { items: fruits, multiple: true, modelValue: ['a', 'c'] },
    });
    const chips = wrapper.findAll('.jt-chip');
    expect(chips).toHaveLength(2);
    expect(chips[0].text()).toContain('Apple');
    expect(chips[1].text()).toContain('Cherry');
  });
});
