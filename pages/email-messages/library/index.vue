<script lang="ts" setup>
import Multiselect from '@vueform/multiselect/src/Multiselect';
import type { Media } from '~~/services/media.service';
import { useToasterStore } from '~~/store/toaster';

const { setMessage } = useToasterStore();

const mediaService = useService('media');

const medias = ref<Media[]>([]);
const response = await mediaService.getAll();
if (response) {
  medias.value = response.data;
}

const showModal = ref(false);
const viewImageModal = ref(false);
const deleteMediaId = ref();
const selectedMedia = ref();
const viewUploadModal = ref(false);

const handleAddNewItem = async (data: { file: any[] }) => {
  const body = new FormData();
  data.file.forEach((fileItem: { file: string | Blob }) => {
    body.append('media', fileItem.file);
  });

  const res = await mediaService.create(body);

  if (res) {
    setMessage('File Uploaded Successfully.', 'success');
    window.location.reload();
  } else {
    setMessage('File not Uploaded.', 'error');
  }
};

async function deleteMedia(id: number) {
  try {
    await mediaService.delete(id);
    setMessage('Deleted Successfully.', 'success');
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
const viewMedia = (media: Media) => {
  viewImageModal.value = true;
  selectedMedia.value = media;
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
            outer-class="md:w-[34rem] w-full search-field"
          />
          <button class="btn btn-primary md:w-30 w-full">Search</button>
        </div>
        <div flex items-center gap-4>
          <button
            @click="viewUploadModal = true"
            class="border-none outline-none flex items-center py-[16px] px-[32px] rounded-[4px] text-stone text-[1.125rem] gap-3 cursor-pointer"
          >
            <img src="/document-add.png" alt="" /> Add new item
          </button>
          <teleport to="body">
            <div v-if="viewUploadModal">
              <CModal
                :show-confirm-button="false"
                :show-close-button="false"
                @close="viewUploadModal = false"
              >
                <div class="md:w-[500px] w-full">
                  <h5 class="text-stone mb-5">Add New Item</h5>
                  <h6 class="text-stone mb-4">Upload Files</h6>
                  <FormKit
                    id="file"
                    :submit-attrs="{
                      inputClass: 'btn btn-primary',
                      wrapperClass: 'flex justify-end',
                    }"
                    type="form"
                    @submit="handleAddNewItem"
                  >
                    <FormKit
                      type="file"
                      name="file"
                      accept=".csv,.png,.jpg,.jpeg,.svg,.xml"
                      inner-class="file-uploader"
                      prefix-icon="link"
                      prefix-icon-class="mr-3"
                      outer-class="md:min-w-[20em] min-w-full mb-5"
                      multiple="true"
                    />
                  </FormKit>
                </div>
              </CModal>
            </div>
          </teleport>
          <Multiselect
            placeholder="Category"
            :options="['test1', 'test2']"
            class="md:w-[14rem] w-full"
          />
        </div>
      </div>
    </div>
    <div class="bg-white small-shadow p-6">
      <div
        class="grid lg:grid-cols-7 md:grid-cols-3 grid-cols-1 gap-3 media-gallery"
      >
        <div
          v-for="media in medias"
          :key="media.id"
          class="cursor-pointer relative overlay"
        >
          <img
            class="w-[12rem] h-[12rem] w-full object-cover object-center"
            :src="media.fileUrl"
            alt=""
          />
          <button class="view-btn" @click="viewMedia(media)">View</button>
          <teleport to="body">
            <div v-if="viewImageModal">
              <CModal
                :show-confirm-button="false"
                :show-close-button="false"
                @close="viewImageModal = false"
              >
                <div>
                  <img
                    class="w-full h-full"
                    :src="selectedMedia.fileUrl"
                    alt=""
                  />
                </div>
              </CModal>
            </div>
          </teleport>
          <button
            class="delete-btn cursor-pointer outline-none border-none bg-transparent p-0"
            @click="
              showModal = true;
              deleteMediaId = media.id;
            "
          >
            <img src="/trash-can.png" alt="" />
          </button>
          <teleport to="body">
            <div v-if="showModal">
              <CModal
                title="Confirmation"
                message="Do you want to proceed with this operation?"
                :item-id="deleteMediaId"
                @confirm="deleteMedia"
                @close="showModal = false"
              />
            </div>
          </teleport>
        </div>
      </div>
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

    &:hover .view-btn {
      opacity: 1;
    }
    &:hover .delete-btn {
      opacity: 1;
    }
  }
}
</style>
