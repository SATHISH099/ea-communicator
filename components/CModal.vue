<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  itemId: {
    type: Number,
    required: true,
  },
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  showCloseButton: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['confirm', 'close']);

const confirmItem = () => {
  emit('confirm', props.itemId);
};

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 z-10">
    <div
      class="md:max-w-[600px] max-w-full max-h-[600px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-[1.875rem] rounded-[0.25rem] shadow-[0_0_10px_rgba(0,0,0,0.1)] overflow-auto"
    >
      <div w-full>
        <div flex items-center justify-end>
          <button
            bg-transparent
            border-0
            cursor-pointer
            p-0
            @click="closeModal"
          >
            <img src="/close.png" alt="close" />
          </button>
        </div>
        <div>
          <h5 text-primary mb-4>{{ props.title }}</h5>
          <p class="text-stone text-[16px]">{{ props.message }}</p>
          <slot />
        </div>
      </div>
      <div flex items-center justify-end gap-4 mt-8>
        <button
          v-if="props.showCloseButton"
          class="btn btn-secondary"
          @click="closeModal"
        >
          No
        </button>
        <button
          v-if="props.showConfirmButton"
          class="btn btn-primary"
          @click="confirmItem"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>
