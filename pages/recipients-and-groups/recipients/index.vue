<script lang="ts" setup>
import '~~/services/recipient.service';
import { useToasterStore } from '~~/store/toaster';

const { setMessage } = useToasterStore();

const recipientService = useService('recipient');

const orderType = ref('desc');
const orderBy = ref('id');
const viewUploadModal = ref(false);

const config = useRuntimeConfig();
const pageSize = ref(10);
const page = ref(1);
const search = ref('');
const searchField = ref('');

const recipientHeaders = [
  { value: 'ID', isSort: true, key: 'id' },
  { value: 'Name', isSort: true, key: 'name' },
  'Phone (Voice)',
  'Phone (Text)',
  'Home phone number',
  'Work phone Number',
  'Primary Email',
  'Alternate Email',
  'Address',
  '',
];

const { data, refresh } = await useFetch<any>(
  () =>
    `recipients?search=${search.value}&pageNumber=${page.value}&pageSize=${pageSize.value}&orderType=${orderType.value}&orderBy=${orderBy.value}`,
  {
    baseURL: config.public.API_SMARTSUITE_BASEURL,
    transform: ({ total, data }) => ({
      total,
      data: data.map((x: any) => ({
        id: x.id,
        name: x.name,
        cellVoice: x.cellVoice,
        cellText: x.cellText,
        homeNumber: x.homeNumber,
        workNumber: x.workNumber,
        emailAddress: x.emailAddress,
        alternateEmail: x.alternateEmail,
        location: `${x.location.address}, ${x.location.city}, ${x.location.state}, ${x.location.country}`,
      })),
    }),
  },
);

const searchKeyword = () => {
  search.value = searchField.value;
  page.value = 1;

  if (search.value) refresh();
};

const paginate = (pg: number) => {
  page.value = pg;
  refresh();
};

const setPerPage = (perPage: number) => {
  pageSize.value = perPage;
  refresh();
};

const sortRecord = (key: string) => {
  orderType.value = orderType.value === 'desc' ? 'asc' : 'desc';
  orderBy.value = key;
  refresh();
};

const deleteRecord = async (id: number) => {
  try {
    await recipientService.delete(id);
    setMessage('Recipient Deleted Successfully.', 'success');
    refresh();
  } catch (error) {
    console.error(error);
  }
};

const uploadFile = async (data: { file: any }) => {
  const formData = new FormData();
  formData.append('file', data.file[0].file);

  if (data.file[0].file.type !== 'text/csv') {
    setMessage('Please upload a CSV file.', 'error');
    return;
  }
  const res = await recipientService.bulkCreate(formData);
  if (res) {
    setMessage('File Uploaded Successfully.', 'success');
    window.location.reload();
  } else {
    setMessage('File not Uploaded.', 'error');
  }
};

const searchEmpty = () => {
  if (!searchField.value) {
    search.value = '';
    orderBy.value = 'id';
    refresh();
  }
};
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-between items-center mb-0 md:mb-10">
      <div md:mb-0 mb-10>
        <h4 class="mb-4 text-stone">Recipients</h4>
        <p class="text-silver">
          <NuxtLink
            to="/recipients-and-groups/recepients"
            class="text-silver sub-heading"
            >Communicator</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink to="/recipients-and-groups" class="text-silver sub-heading">
            Recipients and Groups</NuxtLink
          >
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Recipients</span>
        </p>
      </div>
      <div md:w-auto w-full flex items-center gap-4>
        <div>
          <button class="btn btn-secondary flex items-center gap-3">
            <img src="/download.png" alt="" />
            <CsvTemplate href="/bulk-recipients-sample.csv" />
          </button>
        </div>
        <div>
          <button
            class="btn btn-secondary flex items-center gap-3"
            @click="viewUploadModal = true"
          >
            <img src="/upload.png" alt="" /> Upload CSV
          </button>
        </div>
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
                  @submit="uploadFile"
                >
                  <FormKit
                    type="file"
                    name="file"
                    accept="csv"
                    inner-class="file-uploader"
                    prefix-icon="link"
                    prefix-icon-class="mr-3"
                    outer-class="md:min-w-[20em] min-w-full mb-5"
                  />
                </FormKit>
              </div>
            </CModal>
          </div>
        </teleport>
        <NuxtLink
          :to="{ name: 'recipients-and-groups-recipients-add' }"
          class="btn btn-primary block md:w-auto w-full text-center"
          >Add New Recipient</NuxtLink
        >
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="p-6">
        <div class="flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-wrap items-center gap-4">
            <FormKit
              v-model="searchField"
              prefix-icon="search"
              type="search"
              placeholder="Search"
              input-class="form-control pl-[3.5rem]"
              prefix-icon-class="search-icon"
              outer-class="search-field md:w-[34rem] w-full"
              v-on:keyup.enter="searchKeyword"
              @input="searchEmpty"
            />
            <button
              class="btn btn-primary md:w-auto w-full"
              @click="searchKeyword"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="pb-10 pt-5">
        <DashboardTable
          :headers="recipientHeaders"
          :rows="data?.data"
          type="recipients"
          @sort-record="sortRecord"
          @on-delete-record="deleteRecord"
        />
        <div class="ml-8">
          <PaginationTable
            :total-records="data?.total"
            :current-page="page"
            :paginate="paginate"
            @setPerPage="setPerPage"
          ></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>
