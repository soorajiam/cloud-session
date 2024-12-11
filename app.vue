<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Load PDF.js
  const pdfjsScript = document.createElement('script');
  pdfjsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js';
  document.head.appendChild(pdfjsScript);
});
</script>
