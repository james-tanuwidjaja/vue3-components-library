import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import JtSmartTable from './JtSmartTable.vue';
import { required } from '@/constants';
import type { JtTableColumn } from '@/types';

const columns: JtTableColumn[] = [
  { key: 'name', label: 'Name', type: 'string', rules: [required('Name required')] },
  { key: 'age', label: 'Age', type: 'number' },
];

const items = [
  { id: 1, name: 'Bob', age: 30 },
  { id: 2, name: 'Alice', age: 25 },
];

const findButtonByText = (wrapper: ReturnType<typeof mount>, text: string) =>
  wrapper.findAll('button').find((b) => b.text() === text);

describe('JtSmartTable', () => {
  it('deletes a row and emits update:items + delete', async () => {
    const wrapper = mount(JtSmartTable, { props: { columns, items, pagination: false } });

    const deleteBtn = wrapper.findAll('button').find((b) => b.text() === 'Delete');
    await deleteBtn!.trigger('click');

    expect(wrapper.emitted('delete')).toBeTruthy();
    const updated = wrapper.emitted('update:items')?.at(-1)?.[0] as any[];
    expect(updated).toHaveLength(1);
  });

  it('blocks save when a required field is empty, then adds when valid', async () => {
    const wrapper = mount(JtSmartTable, { props: { columns, items, pagination: false } });

    await findButtonByText(wrapper, '+ Add')!.trigger('click');

    // Save with empty name -> blocked, error shown, no emit.
    await findButtonByText(wrapper, 'Save')!.trigger('click');
    expect(wrapper.emitted('add')).toBeFalsy();
    expect(wrapper.text()).toContain('Name required');

    // Fill the first edit cell (name) and save.
    await wrapper.find('tbody tr input').setValue('Dave');
    await findButtonByText(wrapper, 'Save')!.trigger('click');

    expect(wrapper.emitted('add')).toBeTruthy();
    const added = wrapper.emitted('add')?.at(-1)?.[0] as any;
    expect(added.name).toBe('Dave');
    const updated = wrapper.emitted('update:items')?.at(-1)?.[0] as any[];
    expect(updated).toHaveLength(3);
  });

  it('edits an existing row', async () => {
    const wrapper = mount(JtSmartTable, { props: { columns, items, pagination: false } });

    await findButtonByText(wrapper, 'Edit')!.trigger('click');
    await wrapper.find('tbody tr input').setValue('Bobby');
    await findButtonByText(wrapper, 'Save')!.trigger('click');

    expect(wrapper.emitted('update')).toBeTruthy();
    const updatedRow = wrapper.emitted('update')?.at(-1)?.[0] as any;
    expect(updatedRow.name).toBe('Bobby');
  });
});
