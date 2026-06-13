/* eslint-disable vue/one-component-per-file -- inline test dialog components */
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

  it('stacks a dialog opened from within another dialog (modal-on-modal)', async () => {
    const Inner = defineComponent({
      setup() {
        const { close } = useDialog<string>();
        return () =>
          h('div', { class: 'inner' }, [
            h('button', { class: 'inner-done', onClick: () => close('inner') }, 'Done'),
          ]);
      },
    });

    const Outer = defineComponent({
      setup() {
        const { close } = useDialog<string>();
        const openInner = async () => {
          const innerResult = await openDialog<string>(Inner);
          close(`outer+${innerResult}`);
        };
        return () =>
          h('div', { class: 'outer' }, [
            h('button', { class: 'open-inner', onClick: openInner }, 'Open inner'),
          ]);
      },
    });

    const wrapper = mount(JtDialogProvider, { attachTo: document.body });

    const result = openDialog<string>(Outer);
    await nextTick();
    expect(document.querySelectorAll('.jt-dialog__overlay')).toHaveLength(1);

    // Open the inner dialog from inside the outer one.
    (document.querySelector('.outer .open-inner') as HTMLElement).click();
    await nextTick();
    expect(document.querySelectorAll('.jt-dialog__overlay')).toHaveLength(2);
    expect(document.querySelector('.inner')).not.toBeNull();

    // Resolving the inner dialog flows back into the outer's awaiting code.
    (document.querySelector('.inner .inner-done') as HTMLElement).click();
    await expect(result).resolves.toBe('outer+inner');

    await nextTick();
    expect(document.querySelectorAll('.jt-dialog__overlay')).toHaveLength(0);

    wrapper.unmount();
  });

  it('Escape closes only the topmost dialog', async () => {
    const wrapper = mount(JtDialogProvider, { attachTo: document.body });

    const first = openDialog(Confirm);
    const second = openDialog(Confirm);
    await nextTick();
    expect(document.querySelectorAll('.jt-dialog__overlay')).toHaveLength(2);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await expect(second).resolves.toBeUndefined();
    await nextTick();
    // The first dialog is still open.
    expect(document.querySelectorAll('.jt-dialog__overlay')).toHaveLength(1);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await expect(first).resolves.toBeUndefined();

    wrapper.unmount();
  });
});
