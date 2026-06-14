import { fileURLToPath, URL } from 'node:url';
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import { defineConfig, type Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// GitHub Pages has no SPA fallback; serve index.html for unknown paths via a 404.html copy.
function spaFallback(): Plugin {
  return {
    name: 'docs-spa-fallback',
    closeBundle() {
      const outDir = fromRoot('./dist-docs');
      const index = join(outDir, 'index.html');
      if (existsSync(index)) copyFileSync(index, join(outDir, '404.html'));
    },
  };
}

// Standalone Vite app for the documentation site (dogfoods the library from source).
export default defineConfig({
  root: 'docs',
  base: process.env.DOCS_BASE ?? '/',
  plugins: [vue(), tailwindcss(), spaFallback()],
  resolve: {
    // Order matters: the more specific `/styles` entry must come before the package root.
    alias: [
      {
        find: '@james-tanuwidjaja/vue3-components/styles',
        replacement: fromRoot('./src/assets/styles/index.css'),
      },
      {
        find: '@james-tanuwidjaja/vue3-components',
        replacement: fromRoot('./src/index.ts'),
      },
      { find: '@docs', replacement: fromRoot('./docs') },
      { find: '@', replacement: fromRoot('./src') },
    ],
  },
  build: {
    outDir: fromRoot('./dist-docs'),
    emptyOutDir: true,
  },
});
