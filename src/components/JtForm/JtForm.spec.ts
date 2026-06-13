import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';

import JtForm from './JtForm.vue';
import JtTextField from '../JtTextField/JtTextField.vue';
import { required } from '@/constants';

const Harness = defineComponent({
  components: { JtForm, JtTextField },
  setup() {
    const formRef = ref();
    const name = ref('');
    return { formRef, name, required };
  },
  template: `
    <JtForm ref="formRef" :initial-values="{ name: '' }">
      <JtTextField v-model="name" name="name" :rules="[required()]" />
    </JtForm>
  `,
});

describe('JtForm', () => {
  it('validate() fails when a required field is empty and passes when filled', async () => {
    const wrapper = mount(Harness);
    const form = wrapper.vm.formRef;

    expect(form.validate()).toBe(false);

    await wrapper.find('input').setValue('Ada');
    expect(form.validate()).toBe(true);
  });

  it('tracks dirty state against initial values', async () => {
    const wrapper = mount(Harness);
    const form = wrapper.vm.formRef;

    expect(form.isDirty).toBe(false);
    await wrapper.find('input').setValue('Ada');
    expect(form.isDirty).toBe(true);
  });

  it('reset() restores fields to their initial values', async () => {
    const wrapper = mount(Harness);
    const form = wrapper.vm.formRef;

    await wrapper.find('input').setValue('Ada');
    form.reset();
    await wrapper.vm.$nextTick();

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('');
    expect(form.isDirty).toBe(false);
  });
});
