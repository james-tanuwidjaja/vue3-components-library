import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import JtDataTable from './JtDataTable.vue';
import type { JtTableColumn } from '@/types';

const columns: JtTableColumn[] = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'age', label: 'Age', type: 'number' },
];

const items = [
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Carol', age: 40 },
];

describe('JtDataTable', () => {
  it('renders a row per item', () => {
    const wrapper = mount(JtDataTable, { props: { columns, items, pagination: false } });
    expect(wrapper.findAll('tbody tr')).toHaveLength(3);
  });

  it('sorts ascending when a sortable header is clicked', async () => {
    const wrapper = mount(JtDataTable, { props: { columns, items, pagination: false } });
    await wrapper.findAll('thead th')[0].trigger('click');

    const firstRowName = wrapper.findAll('tbody tr')[0].findAll('td')[0].text();
    expect(firstRowName).toBe('Alice');
  });

  it('filters rows via the column filter input', async () => {
    const wrapper = mount(JtDataTable, { props: { columns, items, pagination: false } });
    await wrapper.find('.jt-table__filters input').setValue('car');

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain('Carol');
  });

  it('paginates with the configured page size', async () => {
    const wrapper = mount(JtDataTable, {
      props: { columns, items, pageSize: 2, filterable: false },
    });
    expect(wrapper.findAll('tbody tr')).toHaveLength(2);
    // Numbered pager: First / 1 2 / Last, plus the range summary.
    expect(wrapper.text()).toContain('First');
    expect(wrapper.text()).toContain('Last');
    expect(wrapper.text()).toContain('1–2 of 3');
  });

  it('navigates to a specific page via the pager', async () => {
    const wrapper = mount(JtDataTable, {
      props: { columns, items, pageSize: 2, filterable: false },
    });
    // Click "Last" to jump to page 2 (1 remaining row).
    const lastButton = wrapper.findAll('button').find((b) => b.text() === 'Last');
    await lastButton!.trigger('click');
    expect(wrapper.findAll('tbody tr')).toHaveLength(1);
    expect(wrapper.text()).toContain('3–3 of 3');
  });

  it('shows skeleton rows when loading', () => {
    const wrapper = mount(JtDataTable, { props: { columns, items, loading: true } });
    expect(wrapper.find('.jt-skeleton').exists()).toBe(true);
  });
});
