<script lang="ts" setup>
import type { Media } from '~~/types/common';

const props = defineProps<{ modelValue?: Media[] }>();
const emit = defineEmits(['update:modelValue', 'error']);
const SIZE_LIMIT = useRuntimeConfig().public.UPLOAD_SIZE_LIMIT;

const errorMessage = ref('');
const hasError = ref(false);
const showAttachmentModal = ref(false);
const selectedAttachments = ref<Media[]>(props.modelValue || []);

const onMediaSelected = (medias: Media[]) => {
  selectedAttachments.value = medias;
  showAttachmentModal.value = false;

  const totalSize = medias.reduce(
    (p, c) => p + parseInt(c.size?.toString() || '0'),
    0,
  );

  if (SIZE_LIMIT < totalSize) {
    hasError.value = true;
    errorMessage.value = 'Attachment size excceeds the allowed size of 25Mb';
    emit('error', errorMessage.value);
  } else {
    hasError.value = false;
    errorMessage.value = '';
    emit('error', '');
    emit('update:modelValue', medias);
  }
};

const removeAttachment = (media: any) => {
  const index = selectedAttachments.value.findIndex((ca) => ca.id === media.id);
  selectedAttachments.value.splice(index);
};
</script>

<template>
  <div
    flex
    flex-row
    class="position-relative border-solid border-rounded md:w-70% w-full border-[#f5f5f5] p-1 bg-[#f5f5f5] cursor-pointer"
  >
    <div
      class="files p-2 w-70% bg-white grid md:grid-cols-3 grid-cols-1 gap-2 items-center"
    >
      <template v-if="selectedAttachments.length > 0">
        <div
          v-for="(media, index) in selectedAttachments"
          :key="index"
          class="p-1 border-solid border-rounded border-[#e4e4e4] bg-[#f7f7f7] flex flex-row items-center justify-around"
        >
          <span w-5>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 16">
              <path
                d="M3,13h.86v-.9h.39c.62,0,1.14-.45,1.14-1.06s-.5-1.05-1.14-1.05h-1.25v3Zm.86-1.59v-.72h.3c.2,0,.37,.13,.37,.35s-.16,.36-.37,.36h-.3Z"
                fill="currentColor"
              ></path>
              <path
                d="M6.19,13h1.19c1,0,1.62-.59,1.62-1.52,0-.87-.62-1.48-1.62-1.48h-1.19v3Zm.86-.71v-1.59h.29c.33,0,.78,.16,.78,.78,0,.65-.45,.81-.78,.81h-.29Z"
                fill="currentColor"
              ></path>
              <path
                d="M10,13h.86v-1.07h1.06v-.69h-1.06v-.54h1.21v-.69h-2.06v3Z"
                fill="currentColor"
              ></path>
              <path
                d="M12.5,16H2.5c-.83,0-1.5-.67-1.5-1.5V1.5c0-.83,.67-1.5,1.5-1.5h7.09c.4,0,.78,.16,1.06,.44l2.91,2.91c.28,.28,.44,.66,.44,1.06V14.5c0,.83-.67,1.5-1.5,1.5ZM2.5,1c-.28,0-.5,.22-.5,.5V14.5c0,.28,.22,.5,.5,.5H12.5c.28,0,.5-.22,.5-.5V4.41c0-.13-.05-.26-.15-.35l-2.91-2.91c-.09-.09-.22-.15-.35-.15H2.5Z"
                fill="currentColor"
              ></path>
              <path
                d="M13.38,5h-2.91c-.81,0-1.47-.66-1.47-1.47V.62c0-.28,.22-.5,.5-.5s.5,.22,.5,.5V3.53c0,.26,.21,.47,.47,.47h2.91c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <p class="mb-0 pl-1 text-xs text-[#555] truncate">
            {{ media.title }}
          </p>
          <button
            class="outline-none bg-transparent border-none border-0"
            type="button"
          >
            <img
              src="/close.png"
              alt="close"
              @click="removeAttachment(media)"
            />
          </button>
        </div>
      </template>
      <template v-else>
        <p class="text-[#555]">No file selected</p>
      </template>
    </div>
    <FormKit
      type="button"
      outer-class="py-4 "
      prefix-icon="uploadCloud"
      prefix-icon-class="inline-block w-8 h-8 pr-2"
      input-class="px-4 md:w-auto w-full outline-none border-none bg-transparent text-[#444] flex items-center cursor-pointer"
      @click="showAttachmentModal = true"
    >
      <span> Attach Files </span>
    </FormKit>
    <div v-if="hasError" class="position-absolute -bottom-6 text-primary">
      {{ errorMessage }}
    </div>
  </div>
  <Teleport to="body">
    <TheModal
      title="Attachments"
      :show="showAttachmentModal"
      @close="showAttachmentModal = false"
    >
      <MediaModalView :on-select="onMediaSelected" />
    </TheModal>
  </Teleport>
</template>
