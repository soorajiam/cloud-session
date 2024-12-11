<template>
  <div v-html="renderedContent"></div>
</template>

<script setup>
import { computed } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  source: {
    type: String,
    required: true
  }
});

const renderedContent = computed(() => {
  try {
    return marked(props.source || '');
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return '';
  }
});
</script> 