<script setup>
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  timeout: {
    type: Number,
    default: 3000,
  },
});

const show = ref(false);
watchEffect(() => {
  if (props.message) {
    show.value = true;

    setTimeout(() => {
      show.value = false;
    }, props.timeout);
  }
});
</script>

<template>
  <div v-if="show" class="toaster">
    {{ message }}
  </div>
</template>

<style>
.toaster {
  position: fixed;
  top: 8rem;
  right: 3rem;
  padding: 12px 24px;
  border-radius: 4px;
  z-index: 9999;
  border: 1px solid #5ca044;
  background: #def0d7;
  color: #2d2d2e;
  font-weight: 500;
}
</style>
