<template>
  <DocPage eyebrow="Getting Started" title="Changelog" lead="Release history for @james-tanuwidjaja/vue3-components.">
    <section v-for="release in releases" :key="release.version" class="changelog-release">
      <h2>
        <span class="changelog-release__version">v{{ release.version }}</span>
        <span class="changelog-release__date">{{ release.date }}</span>
      </h2>

      <template v-for="group in release.groups" :key="group.label">
        <h3>{{ group.label }}</h3>
        <ul>
          <li v-for="item in group.items" :key="item" v-html="item" />
        </ul>
      </template>
    </section>
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '../components/DocPage.vue';

interface ChangeGroup {
  label: 'Added' | 'Changed' | 'Fixed' | 'Removed';
  items: string[];
}

interface Release {
  version: string;
  date: string;
  groups: ChangeGroup[];
}

const releases: Release[] = [
  {
    version: '0.7.0',
    date: '2026-06-14',
    groups: [
      {
        label: 'Added',
        items: [
          '<strong>Semantic color tokens</strong> — <code>danger</code>, <code>info</code>, <code>secondary</code> alongside the existing <code>success</code> and <code>warning</code>. Each token gains a <code>hover</code> and <code>on-*</code> counterpart.',
          '<strong><code>JtButton</code> <code>color</code> prop</strong> — accepts <code>\'primary\' | \'secondary\' | \'success\' | \'danger\' | \'warning\' | \'info\'</code>. Defaults to <code>\'primary\'</code>, fully backward-compatible.',
          '<strong>Edit-form example</strong> on the Forms guide — simulated fetch with skeleton loading, <code>initialValues</code> anchoring, and <code>isDirty</code> dirty-check for an edit workflow.',
          '<strong>Changelog page</strong> in the docs site.',
        ],
      },
      {
        label: 'Changed',
        items: [
          '<strong>Fixed footer</strong> — docs site footer is now pinned to the viewport bottom, aligned with the sidebar bottom section.',
          '<strong>Button CSS</strong> refactored to use internal CSS custom properties so color modifier classes compose cleanly with filled/outlined/text variants.',
          '<strong>Theming docs</strong> updated with a full palette swatch for all tokens.',
          '<strong>README</strong> simplified to a short component list with a link to the docs site.',
        ],
      },
    ],
  },
  {
    version: '0.6.0',
    date: '2026-05',
    groups: [
      {
        label: 'Added',
        items: [
          '<code>JtFooter</code> component and pinned-footer support on <code>JtLayout</code> via the <code>fixed-footer</code> prop.',
          'MDI icon support in sidebar navigation.',
        ],
      },
      {
        label: 'Changed',
        items: ['Header and sidebar are position-fixed; only the main area scrolls.'],
      },
    ],
  },
  {
    version: '0.5.0',
    date: '2026-04',
    groups: [
      {
        label: 'Added',
        items: [
          '<code>JtSmartTable</code> — inline add / edit / delete on top of <code>JtDataTable</code>.',
          '<code>JtDialogProvider</code> + <code>openDialog()</code> promise-based modal API with modal-on-modal stacking.',
        ],
      },
    ],
  },
  {
    version: '0.4.0',
    date: '2026-03',
    groups: [
      {
        label: 'Added',
        items: [
          '<code>JtForm</code> — validation engine with <code>initialValues</code>, <code>isDirty</code>, <code>reset()</code>, <code>validate()</code>, <code>resetValidation()</code>.',
          '<code>JtDatePicker</code> and <code>JtDateTimePicker</code> using Floating UI.',
          'Skeleton loading on every field via the shared <code>loading</code> prop.',
        ],
      },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-02',
    groups: [
      {
        label: 'Added',
        items: [
          '<code>JtDataTable</code> with type-aware column filters, sorting, and pagination.',
          '<code>JtTooltip</code> via Floating UI.',
        ],
      },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-01',
    groups: [
      {
        label: 'Added',
        items: [
          '<code>JtSelect</code> (single + multiple with chips), <code>JtCheckbox</code>, <code>JtSwitch</code>, <code>JtRadioGroup</code>.',
          '<code>createJt()</code> plugin with runtime theming (<code>--jt-*</code> CSS variables).',
        ],
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2025-12',
    groups: [
      {
        label: 'Added',
        items: [
          'Initial release: <code>JtButton</code>, <code>JtTextField</code>, <code>JtTextarea</code>, <code>JtNumberField</code>, <code>JtMoneyField</code>.',
          '<code>JtLayout</code>, <code>JtHeader</code>, <code>JtSidebar</code> app-shell primitives.',
          '<code>JtSkeleton</code> loader.',
          'Self-built docs site with live examples.',
        ],
      },
    ],
  },
];
</script>

<style scoped>
.changelog-release {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-jt-border);
}

.changelog-release:last-child {
  border-bottom: none;
}

.changelog-release h2 {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
}

.changelog-release__version {
  color: var(--color-jt-on-surface);
}

.changelog-release__date {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-jt-muted);
}
</style>
