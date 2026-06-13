import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';

import JtDialogProvider from './JtDialogProvider.vue';
import { openDialog, useDialog, dialogStack } from '@/composables';

const Confirm = defineComponent({
  setup() {
    const { close } = useDialog<boolean>();
    return () =>
      h('div', { class: 'confirm' }, [
        h('button', { class: 'yes', onClick: () => close(true) }, 'Yes'),
        h('button', { class: 'no', onClick: () => close(false) }, 'No'),
      ]);
  },
});

afterEach(() => {
  dialogStack.splice(0, dialogStack.length);
  document.body.innerHTML = '';
});

describe('JtDialogProvider / openDialog', () => {
  it('resolves the promise with the dialog return value', async () => {
    const wrapper = mount(JtDialogProvider, { attachTo: document.body });

    const result = openDialog<boolean>(Confirm);
    await nextTick();
    expect(document.querySelector('.confirm')).not.toBeNull();

    (document.querySelector('.confirm .yes') as HTMLElement).click();
    await expect(result).resolves.toBe(true);

    await nextTick();
    expect(document.querySelector('.confirm')).toBeNull();
    wrapper.unmount();
  });

  it('resolves undefined when the backdrop is clicked', async () => {
    const wrapper = mount(JtDialogProvider, { attachTo: document.body });

    const result = openDialog(Confirm);
    await nextTick();

    (document.querySelector('.jt-dialog__overlay') as HTMLElement).click();
    await expect(result).resolves.toBeUndefined();

    wrapper.unmount();
  });

  it('stays open on backdrop click when persistent', async () => {
    const wrapper = mount(JtDialogProvider, { attachTo: document.body });

    openDialog(Confirm, {}, { persistent: true });
    await nextTick();

    (document.querySelector('.jt-dialog__overlay') as HTMLElement).click();
    await nextTick();
    expect(document.querySelector('.confirm')).not.toBeNull();

    wrapper.unmount();
  });
});
