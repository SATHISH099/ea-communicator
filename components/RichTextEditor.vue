<script setup>
const props = defineProps({
  contentValue: {
    type: String,
    default: '',
  },
});

defineEmits(['update:contentValue']);

const editor = (await import('@ckeditor/ckeditor5-build-classic')).default;
const editorData = ref(props.contentValue);

watch(props, (newProp) => {
  editorData.value = newProp.contentValue;
});
// TODO: if needed later
// if (!document.getElementById('ckeditor-script')) {
//   let script = document.createElement('script');
//   script.src = '/ckeditor/ckeditor.js';
//   script.id = 'ckeditor-script';
//   script.onload = () => {
//     ClassicEditor.create(document.getElementById('editor')).then(editor => {

//     });
//   };
//   document.head.appendChild(script);
// }
</script>

<template>
  <div>
    <ClientOnly>
      <ckeditor
        v-if="editor !== null"
        v-model="editorData"
        :editor="editor"
        @blur="$emit('update:contentValue', editorData)"
      ></ckeditor>
    </ClientOnly>
  </div>
</template>
