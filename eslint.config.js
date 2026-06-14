import { globalIgnores } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-docs/**', '**/coverage/**']),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    name: 'app/rules',
    rules: {
      // Enforce the required single-file-component block order.
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      // Component names are intentionally prefixed (Jt*) and may be single words.
      'vue/multi-word-component-names': 'off',
      // Optional props legitimately default to `undefined` in a library; no default needed.
      'vue/require-default-prop': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Keep ESLint out of formatting decisions — Prettier owns those.
  skipFormatting,
);
