<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
</script>

<template>
  <div>
    <ClientOnly>
      <QuillEditor theme="snow" />
    </ClientOnly>
  </div>
</template>
