<template>
  <JtForm
    v-slot="{ isDirty, reset }"
    class="doc-stack"
    :initial-values="initialValues"
    @submit="onSubmit"
  >
    <JtTextField
      v-model="model.name"
      name="name"
      label="Name"
      required
      :rules="[required()]"
      :loading="loading"
    />
    <JtTextField
      v-model="model.email"
      name="email"
      label="Email"
      required
      :rules="[required(), emailRule()]"
      :loading="loading"
    />
    <JtSelect
      v-model="model.role"
      name="role"
      label="Role"
      :items="roles"
      item-value="value"
      item-label="label"
      :rules="[required()]"
      :loading="loading"
    />
    <div class="doc-row">
      <JtButton v-if="!hasData" type="button" :loading="loading" @click="loadData">
        Load data
      </JtButton>
      <template v-else>
        <JtButton type="submit">Save</JtButton>
        <JtButton type="button" variant="outlined" :disabled="!isDirty" @click="reset">
          Discard
        </JtButton>
      </template>
      <span style="font-size: 0.8125rem; color: var(--color-jt-muted)">{{ status }}</span>
    </div>
  </JtForm>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import {
  JtForm,
  JtTextField,
  JtSelect,
  JtButton,
  required,
  email as emailRule,
} from '@james-tanuwidjaja/vue3-components';

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

const loading = ref(false);
const initialValues = ref<Record<string, unknown>>({});
const model = reactive({ name: '', email: '', role: null as string | null });
const hasData = computed(() => Object.keys(initialValues.value).length > 0);
const status = ref('click "Load data" to fetch the record');

function loadData(): void {
  loading.value = true;
  status.value = 'loading…';
  setTimeout(() => {
    const data = { name: 'Alice Smith', email: 'alice@example.com', role: 'editor' };
    // Set initialValues first so isDirty baseline is anchored before model updates.
    initialValues.value = { ...data };
    model.name = data.name;
    model.email = data.email;
    model.role = data.role;
    loading.value = false;
    status.value = 'loaded — edit a field to see isDirty';
  }, 1500);
}

function onSubmit({ valid }: { valid: boolean }): void {
  if (valid) {
    // Re-anchor baseline so isDirty resets to false after a successful save.
    initialValues.value = { name: model.name, email: model.email, role: model.role };
    status.value = 'saved ✅';
  } else {
    status.value = 'has errors ❌';
  }
}
</script>
