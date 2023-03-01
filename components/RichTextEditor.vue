<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

defineProps(['contentValue']);
defineEmits(['update:contentValue']);
</script>

<template>
  <div>
    <ClientOnly>
      <QuillEditor
        theme="snow"
        @input="$emit('update:contentValue', $event.target.innerText)"
      />
    </ClientOnly>
  </div>
</template>
