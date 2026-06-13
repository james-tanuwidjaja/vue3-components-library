# @james-tanuwidjaja/vue3-components

A reusable **Vue 3** component library with a Vuetify-style `createJt()` plugin, precompiled
CSS (no Tailwind setup required downstream), configurable theming/locale, built-in form
validation, skeleton loading on every field, and Storybook docs.

- **Stack:** Vue 3.5 · Vite 8 · TypeScript 6 · Tailwind v4 (precompiled) · date-fns v4
- **Install once, use everywhere:** `app.use(createJt({ ... }))`
- **Tree-shakeable:** import components individually, or register them all via the plugin

> **Status:** Phase 1 (foundation) — `JtButton`, `JtTextField`, `JtTextarea`, `JtForm`,
> `JtSkeleton`. More components (number/money/date pickers, select, data tables) are on the
> roadmap below.

---

## Installation

```bash
npm install @james-tanuwidjaja/vue3-components
```

Peer dependency: `vue@^3.5`.

## Setup (Vuetify-style)

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

import { createJt } from '@james-tanuwidjaja/vue3-components';
import '@james-tanuwidjaja/vue3-components/styles'; // precompiled CSS — import once

const jt = createJt({
  theme: {
    defaultTheme: 'light', // 'light' | 'dark'
    colors: { primary: '#2563eb' }, // any palette key, see "Theming"
    radius: '0.5rem',
  },
  locale: {
    dateFormat: 'DD/MM/YYYY',
    money: { thousands: '.', decimal: ',', precision: 2 },
  },
  defaults: {
    global: { density: 'comfortable' }, // 'comfortable' | 'compact'
    JtButton: { size: 'md' },
  },
});

createApp(App).use(jt).mount('#app');
```

Installing the plugin **registers every `Jt*` component globally**, provides the resolved
config to all descendants, and applies the theme to `<html>`. You can also import components
directly without the plugin — they fall back to built-in defaults.

---

## Components

### JtButton

```vue
<template>
  <JtButton variant="filled" size="md" :loading="saving" @click="save">Save</JtButton>
  <JtButton variant="outlined">Cancel</JtButton>
  <JtButton variant="text" block>Full width</JtButton>
</template>
```

| Prop       | Type                                  | Default    | Notes                          |
| ---------- | ------------------------------------- | ---------- | ------------------------------ |
| `variant`  | `'filled' \| 'outlined' \| 'text'`    | `'filled'` |                                |
| `size`     | `'sm' \| 'md' \| 'lg'`                | `'md'`     |                                |
| `block`    | `boolean`                             | `false`    | Full width                     |
| `loading`  | `boolean`                             | `false`    | Shows a spinner, blocks clicks |
| `disabled` | `boolean`                             | `false`    |                                |
| `type`     | `'button' \| 'submit' \| 'reset'`     | `'button'` |                                |

Emits `click`. Slots: default, `prepend`, `append`.

### JtTextField

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { required, email } from '@james-tanuwidjaja/vue3-components';

const value = ref('');
</script>

<template>
  <JtTextField
    v-model="value"
    label="Email"
    placeholder="you@example.com"
    hint="We'll never share it"
    required
    :rules="[required(), email()]"
    :loading="isLoading"
  />
</template>
```

Key props: `modelValue` (v-model), `label`, `placeholder`, `hint`, `type`, `name`, `rules`,
`errorMessages`, `required`, `loading`, `disabled`, `readonly`, `density`.
When `loading` is true a **skeleton** replaces the input. Validation errors render **below the
field**. Slots: `prepend`, `append`.

### JtTextarea

Same field API as `JtTextField`, plus `rows`.

```vue
<template>
  <JtTextarea v-model="notes" label="Notes" :rows="4" :rules="[required()]" />
</template>
```

### JtForm

A validation/state engine. Fields with a `name` auto-register; `initialValues` drives both
reset and change detection (empty for *create*, the loaded record for *edit*).

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { required, email } from '@james-tanuwidjaja/vue3-components';

const form = ref();
const model = ref({ name: '', email: '' });

function onSubmit({ valid }: { valid: boolean }) {
  if (valid) {
    /* send model to API */
  }
}
</script>

<template>
  <JtForm
    ref="form"
    :initial-values="{ name: '', email: '' }"
    @submit="onSubmit"
    @update:dirty="(d) => console.log('dirty?', d)"
    v-slot="{ isDirty, validate, reset }"
  >
    <JtTextField v-model="model.name" name="name" label="Name" :rules="[required()]" />
    <JtTextField v-model="model.email" name="email" label="Email" :rules="[required(), email()]" />

    <JtButton type="submit">Submit</JtButton>
    <JtButton type="button" variant="outlined" :disabled="!isDirty" @click="reset">
      Discard changes
    </JtButton>
  </JtForm>
</template>
```

- **Props:** `initialValues` (`Record<string, unknown>`).
- **Emits:** `submit` (`{ valid }`), `update:dirty` (`boolean`).
- **Exposed (via `ref`) & slot props:** `validate()`, `reset()`, `resetValidation()`, `isDirty`.
- **Edit flow:** set `initialValues` to the value from your GET API; `reset()` restores it, and
  `isDirty` lets you warn about unsaved changes.

### JtSkeleton

The loading primitive used by every field; usable on its own.

```vue
<template>
  <JtSkeleton variant="text" width="12rem" />
  <JtSkeleton variant="rect" width="100%" height="8rem" />
  <JtSkeleton variant="circle" width="3rem" height="3rem" />
</template>
```

---

## Validation rules

Rule factories return `(value) => true | string`. Build your own or compose the built-ins:

```ts
import { required, minLength, maxLength, min, max, email, numeric, pattern } from '@james-tanuwidjaja/vue3-components';

const rulesForName = [required('Name is required'), maxLength(50)];
const rulesForAge = [required(), numeric(), min(18, 'Must be 18+')];
```

A custom rule is just a function:

```ts
const noSpaces = (v: string) => !/\s/.test(v) || 'No spaces allowed';
```

---

## Theming

`createJt({ theme })` writes the palette onto `<html>` as `--jt-*` CSS variables, so it's
configurable at runtime without rebuilding CSS. Available color keys: `primary`,
`primaryHover`, `onPrimary`, `surface`, `surfaceMuted`, `onSurface`, `border`, `muted`,
`error`, `success`, `warning`. Set `defaultTheme: 'dark'` (or toggle the `jt-theme-dark`
class on `<html>`) for dark mode.

```ts
createJt({ theme: { defaultTheme: 'dark', colors: { primary: '#16a34a' }, radius: '0.75rem' } });
```

You can also mutate the returned instance's reactive `config` at runtime:

```ts
const jt = createJt();
app.use(jt);
// later:
jt.config.theme.defaultTheme = 'dark';
```

---

## Configurable defaults

`defaults` resolves in this order: **explicit prop → component default → `global` default →
built-in fallback**.

```ts
createJt({
  defaults: {
    global: { density: 'compact' },
    JtButton: { size: 'lg', variant: 'outlined' },
  },
});
```

---

## Project layout

```
src/
  assets/styles/   design tokens + component CSS (precompiled to one file)
  components/      Jt* components (+ stories)
  composables/     useJtConfig, useDefaults, useField, theme helpers
  constants/       injection keys, default config, validation rules
  services/        LoggerService
  types/           public TypeScript types
  utils/           date / money / object helpers
  plugin/          createJt() factory
```

## Development

```bash
npm install
npm run dev            # Vite dev server
npm run storybook      # Storybook at http://localhost:6006
npm run build          # build the library (dist/) + types + CSS
npm run build-storybook
npm run lint
npm run format
npm run typecheck
npm run test
```

Storybook is deployed to GitHub Pages via `.github/workflows/deploy-storybook.yml` on every
push to `main` (set **Settings → Pages → Source: GitHub Actions**):
<https://james-tanuwidjaja.github.io/vue3-components-library/>

---

## Roadmap (next phases)

`JtNumberField` · `JtMoneyField` (thousand/decimal separators) · `JtDatePicker`
(dual `v-model` `YYYY-MM-DD` + `DD/MM/YYYY`) · `JtDateTimePicker` (Date + confirm) ·
`JtSelect` (searchable, any value type) · `JtDataTable` (type-aware column filters) ·
`JtSmartTable` (inline add/edit/delete). Plus `JtCheckbox`, `JtRadioGroup`, `JtSwitch`,
`JtDialog`, `JtPagination`.

## License

MIT
