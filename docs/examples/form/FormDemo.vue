<template>
  <JtForm
    ref="formRef"
    v-slot="{ isDirty, reset }"
    :initial-values="initial"
    class="doc-stack"
    @submit="onSubmit"
  >
    <JtTextField v-model="model.name" name="name" label="Name" required :rules="[required()]" />
    <JtTextField
      v-model="model.email"
      name="email"
      label="Email"
      required
      :rules="[required(), emailRule()]"
    />
    <div class="doc-row">
      <JtButton type="submit">Submit</JtButton>
      <JtButton type="button" variant="outlined" :disabled="!isDirty" @click="reset">
        Discard
      </JtButton>
      <span style="font-size: 0.8125rem; color: var(--color-jt-muted)">
        dirty: {{ isDirty }} · {{ status }}
      </span>
    </div>
  </JtForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import {
  JtForm,
  JtTextField,
  JtButton,
  required,
  email as emailRule,
} from '@james-tanuwidjaja/vue3-components';

const initial = { name: '', email: '' };
const model = reactive({ ...initial });
const status = ref('not submitted');
const formRef = ref();

function onSubmit(payload: { valid: boolean }): void {
  status.value = payload.valid ? 'submitted ✅' : 'has errors ❌';
}
</script>
