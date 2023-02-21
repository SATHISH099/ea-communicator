<script lang="ts" setup>
import Multiselect from '@vueform/multiselect/src/Multiselect';
import type { Media } from '~~/services/media.service';

const mediaService = useService('media');

const medias = ref<Media[]>([]);

const response = await mediaService.getAll();

if (response) {
  medias.value = response;
}
</script>

<template>
  <div>
    <div mb-8>
      <div mb-10>
        <h4 class="mb-4 text-stone">Library</h4>
        <p class="text-silver">
          Communicator / Email/Messages /
          <span class="text-primary">Library</span>
        </p>
      </div>
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div class="flex flex-wrap items-center gap-4">
          <FormKit
            prefix-icon="search"
            type="search"
            placeholder="Search media items"
            input-class="form-control pl-[3.5rem]"
            prefix-icon-class="search-icon"
            outer-class="md:w-[34rem] w-full"
          />
          <button class="btn btn-primary md:w-30 w-full">Search</button>
        </div>
        <div flex items-center gap-4>
          <button
            class="border-none outline-none flex items-center py-[16px] px-[32px] rounded-[4px] text-stone text-[1.125rem] gap-3 cursor-pointer"
          >
            <img src="/document-add.png" alt="" /> Add new item
          </button>
          <Multiselect
            placeholder="Category"
            :options="['test1', 'test2']"
            class="md:w-[14rem] w-full"
          />
        </div>
      </div>
    </div>
    <div class="bg-white small-shadow p-6">
      <div class="grid lg:grid-cols-7 md:grid-cols-3 grid-cols-1 gap-3">
        <div
          v-for="media in medias"
          :key="media.id"
          class="library-image max-w-[12rem] cursor-pointer relative"
        >
          <img w-full object-cover object-center :src="media.fileUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
