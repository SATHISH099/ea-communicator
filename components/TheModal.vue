<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits('close');
</script>

<template>
  <div>
    <div
      v-if="props.show"
      class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-[0.6] z-10"
    >
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-[1.875rem] rounded-[0.25rem] shadow-[0_0_10px_rgba(0,0,0,0.1)] md:max-w-[50rem] max-w-[23rem] max-h-[40rem]"
      >
        <header class="flex justify-between items-center mb-[1rem]">
          <h5 text-stone>{{ props.title }}</h5>
          <button
            bg-transparent
            border-0
            cursor-pointer
            p-0
            @click="emit('close')"
          >
            <img src="/close.png" alt="close" />
          </button>
        </header>
        <div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
