<script setup>
import { storeToRefs } from 'pinia';
import { useToasterStore } from '~~/store/toaster';

const store = useToasterStore();
const { getMessage: message, getType: type } = storeToRefs(store);
</script>

<template>
  <div v-if="!!message" class="toaster" :class="type">
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
  color: #2d2d2e;
  font-weight: 500;
}
.success {
  background: #def0d7;
  border: 1px solid #5ca044;
}
.error {
  color: white;
  background: #da1313;
  border: 1px solid #da1313;
}
</style>
