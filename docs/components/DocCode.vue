<template>
  <div class="doc-code">
    <button type="button" class="doc-code__copy" @click="copy">
      {{ copied ? 'Copied!' : 'Copy' }}
    </button>
    <!-- eslint-disable-next-line vue/no-v-html -- highlight.js escapes the input -->
    <pre><code class="hljs" v-html="highlighted"></code></pre>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import hljs from 'highlight.js/lib/common';

const props = withDefaults(defineProps<{ code: string; lang?: string }>(), { lang: 'xml' });

const highlighted = computed(() => {
  const code = props.code.trim();
  try {
    return hljs.highlight(code, { language: props.lang }).value;
  } catch {
    return hljs.highlightAuto(code).value;
  }
});

const copied = ref(false);
async function copy(): Promise<void> {
  await navigator.clipboard.writeText(props.code.trim());
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
}
</script>
