<script lang="ts" setup>
import { setErrors } from '@formkit/vue';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import type { Media } from '~~/services/media.service';
const complete = ref(false);
const mediaService = useService('media');

const medias = ref<Media[]>([]);

const response = await mediaService.getAll();

if (response) {
  medias.value = response.data;
}
const handleAddNewItem = async (data: { file: any[] }) => {
  const body = new FormData();
  data.file.forEach((fileItem: { file: string | Blob }) => {
    body.append('media', fileItem.file);
  });

  const res = await mediaService.create(body);

  if (res) {
    window.location.reload();
    complete.value = true;
  } else {
    setErrors('media', ['The server didn’t like our request.']);
  }
};
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
          <FormKit
            v-if="!complete"
            id="file"
            type="form"
            @submit="handleAddNewItem"
          >
            <FormKit
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.csv,.png,.jpg,.jpeg"
              multiple="true"
              inner-class="file-uploader"
              prefix-icon="link"
              prefix-icon-class="mr-3"
              outer-class="md:min-w-[20em] min-w-full"
              validation="required"
            />
          </FormKit>
          <div v-else class="complete">File upload complete.</div>
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
          class="cursor-pointer relative"
        >
          <img
            class="w-[12rem] h-[12rem] w-full object-cover object-center"
            :src="media.fileUrl"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
