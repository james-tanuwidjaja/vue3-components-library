/* eslint-disable vue/one-component-per-file -- inline demo dialog components */
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, h, ref } from 'vue';

import JtDialog from './JtDialog.vue';
import JtButton from '../JtButton/JtButton.vue';
import JtTextField from '../JtTextField/JtTextField.vue';
import JtDialogProvider from '../JtDialogProvider/JtDialogProvider.vue';
import { openDialog, useDialog } from '@/composables';

/** A confirm dialog that resolves the openDialog() promise with a boolean. */
const ConfirmDialog = defineComponent({
  props: { message: { type: String, default: 'Are you sure?' } },
  setup(props) {
    const { close } = useDialog<boolean>();
    return () =>
      h(
        JtDialog,
        { title: 'Please confirm' },
        {
          default: () => props.message,
          footer: () => [
            h(JtButton, { variant: 'text', onClick: () => close(false) }, () => 'Cancel'),
            h(JtButton, { onClick: () => close(true) }, () => 'Confirm'),
          ],
        },
      );
  },
});

/** A prompt dialog that resolves with a typed-in string. */
const PromptDialog = defineComponent({
  setup() {
    const { close } = useDialog<string | undefined>();
    const value = ref('');
    return () =>
      h(
        JtDialog,
        { title: 'Enter your name', width: '24rem' },
        {
          default: () =>
            h(JtTextField, {
              modelValue: value.value,
              'onUpdate:modelValue': (v: string) => (value.value = v),
              label: 'Name',
            }),
          footer: () => [
            h(JtButton, { variant: 'text', onClick: () => close(undefined) }, () => 'Cancel'),
            h(JtButton, { onClick: () => close(value.value) }, () => 'OK'),
          ],
        },
      );
  },
});

const meta: Meta<typeof JtDialog> = {
  title: 'Components/JtDialog',
  component: JtDialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JtDialog>;

export const PromiseDialogs: Story = {
  render: () => ({
    components: { JtButton, JtDialogProvider },
    setup() {
      const result = ref('—');
      const confirm = async () => {
        const ok = await openDialog<boolean>(ConfirmDialog, { message: 'Delete this item?' });
        result.value = ok ? 'Confirmed ✅' : 'Cancelled ❌';
      };
      const prompt = async () => {
        const name = await openDialog<string | undefined>(PromptDialog);
        result.value = name ? `Hello, ${name}!` : 'No name entered';
      };
      return { confirm, prompt, result };
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:0.75rem; align-items:flex-start;">
        <div style="display:flex; gap:0.5rem;">
          <JtButton @click="confirm">Confirm dialog</JtButton>
          <JtButton variant="outlined" @click="prompt">Prompt dialog</JtButton>
        </div>
        <p style="font-size:0.8125rem;">Result: {{ result }}</p>
        <!-- Mounted once near the app root -->
        <JtDialogProvider />
      </div>
    `,
  }),
};
