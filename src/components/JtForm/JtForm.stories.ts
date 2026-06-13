import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import JtForm from './JtForm.vue';
import JtTextField from '../JtTextField/JtTextField.vue';
import JtButton from '../JtButton/JtButton.vue';
import { required, email } from '@/constants';

const meta: Meta<typeof JtForm> = {
  title: 'Components/JtForm',
  component: JtForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JtForm>;

/** Create flow: empty initial values, reset clears the fields. */
export const CreateForm: Story = {
  render: () => ({
    components: { JtForm, JtTextField, JtButton },
    setup() {
      const name = ref('');
      const mail = ref('');
      const result = ref('—');
      const onSubmit = (payload: { valid: boolean }) => {
        result.value = payload.valid ? 'submitted ✅' : 'has errors ❌';
      };
      return { name, mail, result, onSubmit, required, email };
    },
    template: `
      <JtForm
        v-slot="{ isDirty, reset }"
        @submit="onSubmit"
        style="max-width:22rem; display:flex; flex-direction:column; gap:0.75rem;"
      >
        <JtTextField v-model="name" name="name" label="Name" required :rules="[required()]" />
        <JtTextField v-model="mail" name="email" label="Email" required :rules="[required(), email()]" />
        <div style="display:flex; gap:0.5rem;">
          <JtButton type="submit">Submit</JtButton>
          <JtButton type="button" variant="outlined" @click="reset">Reset</JtButton>
        </div>
        <p style="font-size:0.8125rem;">Dirty: <strong>{{ isDirty }}</strong> · Status: {{ result }}</p>
      </JtForm>
    `,
  }),
};

/** Edit flow: initial values come from a loaded record; reset restores them. */
export const EditForm: Story = {
  render: () => ({
    components: { JtForm, JtTextField, JtButton },
    setup() {
      const record = { name: 'Ada Lovelace', email: 'ada@example.com' };
      const name = ref(record.name);
      const mail = ref(record.email);
      return { record, name, mail, required, email };
    },
    template: `
      <JtForm
        v-slot="{ isDirty, reset }"
        :initial-values="record"
        style="max-width:22rem; display:flex; flex-direction:column; gap:0.75rem;"
      >
        <JtTextField v-model="name" name="name" label="Name" :rules="[required()]" />
        <JtTextField v-model="mail" name="email" label="Email" :rules="[required(), email()]" />
        <div style="display:flex; gap:0.5rem;">
          <JtButton type="submit">Save</JtButton>
          <JtButton type="button" variant="outlined" :disabled="!isDirty" @click="reset">
            Discard changes
          </JtButton>
        </div>
        <p style="font-size:0.8125rem;">Unsaved changes: <strong>{{ isDirty }}</strong></p>
      </JtForm>
    `,
  }),
};
