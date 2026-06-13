import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import JtLayout from './JtLayout.vue';
import JtHeader from '../JtHeader/JtHeader.vue';

describe('JtLayout + JtHeader', () => {
  it('toggles collapsed via the header button and swaps brand → submark', async () => {
    const Harness = defineComponent({
      components: { JtLayout, JtHeader },
      template: `
        <JtLayout>
          <template #header>
            <JtHeader>
              <template #brand><span class="brand">Brand</span></template>
              <template #submark><span class="submark">B</span></template>
            </JtHeader>
          </template>
          <div>content</div>
        </JtLayout>
      `,
    });

    const wrapper = mount(Harness);
    // Expanded: full brand shown, submark hidden.
    expect(wrapper.find('.brand').exists()).toBe(true);
    expect(wrapper.find('.submark').exists()).toBe(false);

    await wrapper.find('.jt-header__toggle').trigger('click');

    // Collapsed: submark shown, brand hidden.
    expect(wrapper.find('.submark').exists()).toBe(true);
    expect(wrapper.find('.brand').exists()).toBe(false);
  });

  it('supports v-model:collapsed', async () => {
    const wrapper = mount(JtLayout, {
      props: {
        collapsed: false,
        'onUpdate:collapsed': (v: boolean) => wrapper.setProps({ collapsed: v }),
      },
    });
    (wrapper.vm as any).toggle();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:collapsed')?.at(-1)).toEqual([true]);
  });

  it('JtHeader emits update:collapsed when used standalone', async () => {
    const wrapper = mount(JtHeader, { props: { collapsed: false } });
    await wrapper.find('.jt-header__toggle').trigger('click');
    expect(wrapper.emitted('update:collapsed')?.[0]).toEqual([true]);
  });
});
