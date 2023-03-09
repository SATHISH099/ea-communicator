<script setup>
import { storeToRefs } from 'pinia';
import { useToasterStore } from '~~/store/toaster';

const store = useToasterStore();
const { getMessage: message, getType: type } = storeToRefs(store);
</script>

<template>
  <div
    v-if="!!message"
    class="fixed top-[8rem] right-[3rem] px-[24px] py-[12px] rounded-[4px] z-[999] font-medium"
    :class="[
      type,
      type === 'success'
        ? 'text-[#2D2D2E] bg-[#def0d7] border-solid border border-[#5ca044]'
        : '',
      type === 'error'
        ? 'text-[#28293D] bg-[#FDE4E1] border-solid border border-[#F54336]'
        : '',
    ]"
  >
    {{ message }}
  </div>
</template>
