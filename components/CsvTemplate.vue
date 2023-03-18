<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <a :href="href" download>Download Template</a>
  </div>
</template>
