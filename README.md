# @james-tanuwidjaja/vue3-components

A reusable **Vue 3** component library with a Vuetify-style `createJt()` plugin, precompiled
CSS (no Tailwind setup required downstream), configurable theming/locale, built-in form
validation, skeleton loading on every field, and Storybook docs.

- **Stack:** Vue 3.5 · Vite 8 · TypeScript 6 · Tailwind v4 (precompiled) · date-fns v4
- **Install once, use everywhere:** `app.use(createJt({ ... }))`
- **Tree-shakeable:** import components individually, or register them all via the plugin

📖 **[Live Storybook & component playground →](https://james-tanuwidjaja.github.io/vue3-components-library/)**

> **Components:** `JtButton`, `JtTextField`, `JtTextarea`, `JtNumberField`, `JtMoneyField`,
> `JtSelect` (single + multiple), `JtCheckbox`, `JtSwitch`, `JtRadioGroup`, `JtDatePicker`,
> `JtDateTimePicker`, `JtDataTable`, `JtSmartTable`, `JtForm`, `JtTooltip`, `JtDialog`
> (promise-based), `JtSkeleton`. Every field supports `loading` (skeleton) and renders validation
> errors below it.

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

### JtNumberField

Numeric input; `modelValue` is a `number` (or `null`). Supports `min`, `max`, `step`, plus the
shared field props.

```vue
<template>
  <JtNumberField v-model="qty" label="Quantity" :min="0" :max="99" :rules="[required()]" />
</template>
```

### JtMoneyField

Live thousand/decimal grouping. `modelValue` is the **raw number**; the display is formatted.
Separators default to the plugin locale (`.` thousands / `,` decimal) and are overridable per field.

```vue
<template>
  <JtMoneyField v-model="price" label="Price" prefix="Rp" />
  <!-- US style: -->
  <JtMoneyField v-model="usd" prefix="$" thousands="," decimal="." :precision="2" />
</template>
```

### JtSelect

Searchable dropdown (type to filter, like Vuetify autocomplete). The selected `value` can be **any
type** — string, number, boolean, or object — and the value/label keys are configurable.

```vue
<script setup lang="ts">
const items = [
  { label: 'Indonesia', value: 'ID' },
  { label: 'Singapore', value: 'SG' },
];
</script>

<template>
  <JtSelect
    v-model="country"
    label="Country"
    :items="items"
    item-value="value"
    item-label="label"
    clearable
    :rules="[required()]"
  />

  <!-- Object values: pass a getter -->
  <JtSelect v-model="user" :items="users" :item-value="(u) => u" item-label="name" />
</template>
```

Props: `items`, `itemValue` (key or getter), `itemLabel` (key or getter), `multiple` (array model
with chips), `searchable` (default `true`), `clearable`, `noDataText`, plus the shared field props.
Slot `option` customizes rows.

```vue
<!-- Multiple selection — modelValue is an array -->
<template>
  <JtSelect v-model="tags" :items="options" multiple clearable />
</template>
```

### JtDatePicker

Calendar input. Clicking a day commits immediately (no confirm) and the display is formatted
(`DD/MM/YYYY` by default, configurable). **Two values** via dual v-model:

```vue
<script setup lang="ts">
import { ref } from 'vue';
const iso = ref<string | null>(null); // 'YYYY-MM-DD'
const formatted = ref(''); // 'DD/MM/YYYY'
</script>

<template>
  <JtDatePicker v-model="iso" v-model:formatted="formatted" label="Birth date" clearable />
</template>
```

Props: `displayFormat`, `min`/`max` (Date or `YYYY-MM-DD`), `clearable`, plus shared field props.

### JtDateTimePicker

Like `JtDatePicker` but with time inputs and a **confirm button**; `modelValue` is a `Date`.

```vue
<template>
  <JtDateTimePicker v-model="appointment" label="Appointment" clearable />
</template>
```

### JtDataTable

Datatable-style display: pass column definitions and items. Per-column filtering is driven by the
column `type` (string→text, number→number, date→date picker, select→dropdown, boolean→yes/no), plus
sorting and pagination.

```vue
<script setup lang="ts">
import type { JtTableColumn } from '@james-tanuwidjaja/vue3-components';

const columns: JtTableColumn[] = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'age', label: 'Age', type: 'number', align: 'right' },
  { key: 'joined', label: 'Joined', type: 'date' },
  { key: 'role', label: 'Role', type: 'select', items: roles },
  { key: 'active', label: 'Active', type: 'boolean' },
];
</script>

<template>
  <JtDataTable :columns="columns" :items="rows" :page-size="10">
    <!-- Custom cell via a slot named after the column key (vue-good-table-next style) -->
    <template #name="{ row, value }"><strong>{{ value }}</strong></template>
    <template #active="{ value }">{{ value ? '✅' : '—' }}</template>
    <template #actions="{ row }">
      <button @click="view(row)">View</button>
    </template>
  </JtDataTable>
</template>
```

Props: `columns`, `items`, `itemKey` (default `'id'`), `filterable`, `pagination`, `pageSize`,
`loading`. **Slots:** a slot **named after a column's `key`** customizes that column's cell
(slot props: `{ row, value, column, index }`) — e.g. `<template #name="{ value }">`; `cell:<key>`
works as an alias; `actions` adds a trailing actions column. Headers and cells are left-aligned.

### JtSmartTable

Everything `JtDataTable` does, plus inline **add / edit / delete** with per-column validation
(reuses the same rule functions). Use `v-model:items` and/or listen to `add` / `update` / `delete`.

```vue
<template>
  <JtSmartTable
    v-model:items="rows"
    :columns="columns"
    @add="onAdd"
    @update="onUpdate"
    @delete="onDelete"
  />
</template>
```

Columns gain `rules` (validation while editing) and `editable` (default `true`). Props:
`addable`, `editable`, `deletable` (all default `true`), plus the `JtDataTable` props.

### JtCheckbox / JtSwitch

Boolean inputs with the shared field behaviour (rules, error-below, `loading`).

```vue
<template>
  <JtCheckbox v-model="accepted" label="I accept the terms" />
  <JtSwitch v-model="notify" label="Enable notifications" />
</template>
```

> For a "must be checked" rule use `(v) => v || 'message'` — the `required()` helper treats `false`
> as a valid value.

### JtRadioGroup

Single choice from a list; `modelValue` can be **any type**, with configurable `itemValue`/`itemLabel`.

```vue
<template>
  <JtRadioGroup
    v-model="size"
    label="Size"
    :items="[{ label: 'S', value: 's' }, { label: 'M', value: 'm' }]"
    direction="horizontal"
    :rules="[required()]"
  />
</template>
```

### JtTooltip

Floating tooltip shown on hover/focus (positioned with Floating UI).

```vue
<template>
  <JtTooltip text="Delete permanently" placement="top">
    <JtButton variant="text">🗑</JtButton>
  </JtTooltip>
</template>
```

### JtDialog (promise-based)

Dialogs work like [`vue3-promise-dialog`](https://www.npmjs.com/package/vue3-promise-dialog):
`openDialog()` returns a **promise** that resolves when the dialog closes.

**1. Mount the provider once** near your app root:

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <JtDialogProvider />
</template>
```

**2. Write a dialog component** that resolves via `useDialog().close(value)`:

```vue
<!-- ConfirmDialog.vue -->
<script setup lang="ts">
import { JtDialog, JtButton, useDialog } from '@james-tanuwidjaja/vue3-components';

defineProps<{ message: string }>();
const { close } = useDialog<boolean>();
</script>

<template>
  <JtDialog title="Please confirm">
    {{ message }}
    <template #footer>
      <JtButton variant="text" @click="close(false)">Cancel</JtButton>
      <JtButton @click="close(true)">Confirm</JtButton>
    </template>
  </JtDialog>
</template>
```

**3. Open it and await the result:**

```ts
import { openDialog } from '@james-tanuwidjaja/vue3-components';
import ConfirmDialog from './ConfirmDialog.vue';

const confirmed = await openDialog<boolean>(ConfirmDialog, { message: 'Delete this item?' });
if (confirmed) {
  /* ... */
}
```

- `openDialog(component, props?, { persistent })` → `Promise<T>`. With `persistent: true`, backdrop
  click and Escape won't close it.
- Backdrop click / Escape / the header × resolve the promise with `undefined`.
- **Stacked dialogs (modal-on-modal):** unlike `vue3-promise-dialog`, you can `await openDialog(...)`
  from *inside* another dialog — each is rendered on its own overlay, resolves independently, and
  Escape closes only the topmost one.
- `JtDialog` is a presentational shell (`title`, `hideClose`, `width`; slots `default`, `title`,
  `footer`); you can also build fully custom dialog components.

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

## Roadmap

The core set is complete. Possible future additions: a `JtMenu`/dropdown-menu, `JtTabs`,
`JtSnackbar`/toast notifications, and a date-range mode for `JtDatePicker`.

## License

MIT
