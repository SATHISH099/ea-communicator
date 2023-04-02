<script lang="ts" setup>
const props = defineProps<{ onSelect: (mediaIds: any[]) => void }>();

const extensions = {
  photos: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
  others: ['pdf', 'xls', 'xlsx', 'doc', 'docx', 'csv', 'ppt', 'pptx'],
};

const selectedMedia = ref<number[]>([]);
const pageSize = ref(20);
const orderType = ref<'desc' | 'asc'>('desc');
const orderBy = ref('id');
const search = ref('');
const extensionType = ref('');
const searchField = ref('');
const { $trpc } = useNuxtApp();

const mediaService = useService('media');
const { data: medias, refresh } = await useAsyncData(() =>
  $trpc.library.list.query({
    search: search.value,
    pageNumber: 1,
    orderType: orderType.value,
    orderBy: orderBy.value,
    pageSize: pageSize.value,
  }),
);

const searchKeyword = () => {
  selectedMedia.value = [];
  search.value = searchField.value;
  refresh();
};

const searchCategory = () => {
  selectedMedia.value = [];
  search.value = `${extensionType.value}`;
  refresh();
};

const selectMedia = (media: any) => {
  const currentMedias = [...selectedMedia.value];
  if (currentMedias.includes(media.id)) {
    currentMedias.splice(currentMedias.indexOf(media.id), 1);
  } else {
    currentMedias.push(media.id);
  }

  selectedMedia.value = currentMedias;
};

const onFinalSelection = () => {
  const selected =
    medias.value?.data.filter((m) => selectedMedia.value.includes(m.id)) || [];

  props.onSelect(selected);
};

const handleAddMedia = async (event: any) => {
  const files = event.target.files;
  const body = new FormData();

  if (files.length) {
    for (const file of files) {
      body.append('media[]', file);
    }

    const response = await mediaService.create(body);
    refresh();

    for (const media of response) {
      selectMedia(media);
    }
  }
};
</script>

<template>
  <div>
    <div>
      <p mb-3>Upload from computer</p>
      <FormKit
        type="file"
        name="file"
        :accept="`${extensions.photos.toString()},${extensions.others.toString()}`"
        inner-class="file-uploader h-[10rem] border-dashed! flex"
        prefix-icon="link"
        prefix-icon-class="mr-3 h-[10rem] flex bg-transparent!"
        outer-class="md:min-w-[20em] min-w-full mb-5"
        multiple="true"
        @change="handleAddMedia"
      />
    </div>
    <p mb-4>Select from Library</p>
    <div class="p-4 border-solid border-rounded border-[#ccc]">
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div class="flex flex-wrap items-center gap-4">
          <FormKit
            v-model="searchField"
            prefix-icon="search"
            type="search"
            placeholder="Search"
            input-class="form-control pl-[3.5rem]"
            prefix-icon-class="search-icon"
            outer-class="md:w-[20rem] w-full search-field"
            @keyup.enter="searchKeyword"
          />
          <button class="btn btn-primary md:w-30 w-full" @click="searchKeyword">
            Search
          </button>
        </div>
        <div md:flex md:items-center gap-4 class="md:w-[12rem] w-full">
          <FormKit
            v-model="extensionType"
            :options="[
              { label: 'All Categories', value: '' },
              ...extensions.photos,
              ...extensions.others,
            ]"
            type="select"
            placeholder="Search"
            input-class="form-control md:w-[12rem] w-full"
            @input="searchCategory"
          />
        </div>
      </div>
      <div class="bg-white small-shadow p-6 max-h-[12rem] overflow-auto">
        <div
          v-if="medias?.total || 0 > 0"
          class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-3 media-gallery"
        >
          <div
            v-for="media in medias?.data || []"
            :key="media.id"
            class="cursor-pointer relative overlay w-auto"
            :class="{ selected: selectedMedia.includes(media.id) }"
          >
            <img
              v-if="extensions.others.includes(media.extension)"
              class="h-auto w-full object-cover object-center"
              :src="`/icon/${media.extension}.png`"
              alt=""
            />
            <img
              v-if="extensions.photos.includes(media.extension)"
              class="h-auto w-full object-cover object-center"
              :src="media.fileUrl"
              alt=""
            />
            <div>{{ titleLimit(media.title, 20) }}</div>
            <button
              type="button"
              :class="{ selected: selectedMedia.includes(media.id) }"
              class="view-btn"
              @click="selectMedia(media)"
            >
              {{ selectedMedia.includes(media.id) ? 'Unselect' : 'Select' }}
            </button>
          </div>
        </div>
        <div v-else>
          <p>No items found in gallery</p>
        </div>
      </div>
    </div>
    <div class="mt-4 text-right">
      <button type="button" class="btn btn-primary" @click="onFinalSelection">
        Select
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.media-gallery {
  .overlay {
    position: relative;
    display: inline-block;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        0deg,
        rgba(180, 36, 36, 0.2),
        rgba(180, 36, 36, 0.2)
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      border: 1px solid #b42424;
    }

    &.selected::before,
    &:hover:before {
      opacity: 1;
    }

    .view-btn {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 8px 17px;
      background-color: #b42424;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .delete-btn {
      position: absolute;
      top: 1.6rem;
      right: 0.3rem;
      transform: translate(-50%, -50%);
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &.selected .view-btn,
    &:hover .view-btn {
      opacity: 1;
    }
  }
}
</style>
