<script lang="ts" setup>
import Multiselect from '@vueform/multiselect/src/Multiselect';
import moment from 'moment';

const { $trpc } = useNuxtApp();
const type = ref<'email' | 'sms'>('email');
const page = ref(1);
const isDelete = ref(false);
const orderType = ref<'desc' | 'asc'>('desc');
const orderBy = ref('id');
const search = ref('');
const searchField = ref('');

const MessageHeaders = [
  { value: 'Id', isSort: true, key: 'id' },
  'Title',
  'Message',
  { value: 'Created Date', isSort: true, key: 'createdAt' },
];

const showLess = (input: string) =>
  input && input.length > 100 ? `${input.substring(0, 100)}...` : input;

const { data, refresh } = await useAsyncData(
  (): any =>
    $trpc[type.value].list.query({
      search: search.value,
      pageNumber: page.value,
      isPredefined: true,
      orderType: orderType.value,
      orderBy: orderBy.value,
    }),
  {
    transform: ({ total, data }: any) => ({
      total,
      data: data.map((message: any) => ({
        id: message.id,
        title: type.value === 'email' ? message.subject : message.title,
        message:
          type.value === 'email'
            ? showLess(message.body)
            : showLess(message.message),
        sentDate: moment(message.createdAt).format('dddd, Do MMMM YYYY h:mm A'),
      })),
    }),
  },
);
const searchKeyword = () => {
  search.value = searchField.value;
  page.value = 1;
  refresh();
};

const paginate = (pg: number) => {
  page.value = pg;
  refresh();
};

const deleteRecord = async (id: number) => {
  await $trpc[type.value].delete.mutate(id);

  isDelete.value = true;
  refresh();
};

const sortRecord = (key: string) => {
  orderType.value = orderType.value === 'desc' ? 'asc' : 'desc';
  orderBy.value = key;
  refresh();
};

const optionTypeSelected = (option: 'email' | 'sms') => {
  type.value = option;
  orderBy.value = 'id';

  refresh();
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
    <div class="flex flex-wrap justify-between items-center mb-10">
      <div class="md:mb-0 mb-10">
        <h4 class="mb-4 text-stone">Predefined Templates</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Email / Messages</span>
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Template</span>
        </p>
      </div>
      <div class="md:w-auto w-full">
        <NuxtLink
          :to="{ name: 'email-messages-predefined-templates-add' }"
          class="btn btn-primary btn-create block md:w-auto w-full text-center"
          >Create Message</NuxtLink
        >
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div v-if="isDelete" class="success alert-success">
        Template Successfully Deleted
      </div>
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
              outer-class="md:w-[34rem] w-full search-field"
              @input="searchEmpty"
            />
            <button
              class="btn btn-primary md:w-30 w-full"
              @click="searchKeyword"
            >
              Search
            </button>
          </div>
          <div class="flex flex-wrap items-center gap-3 md:w-auto w-full">
            <Multiselect
              v-model="type"
              placeholder="Predefined Type"
              :options="[
                { value: 'email', label: 'Email' },
                { value: 'sms', label: 'SMS' },
              ]"
              class="md:w-[14rem] w-full"
              @select="optionTypeSelected"
            />
          </div>
        </div>
      </div>
      <div class="pb-10 pt-5">
        <DashboardTable
          :headers="MessageHeaders"
          :rows="data?.data || []"
          :type="type === 'email' ? 'email' : 'sms'"
          @onDeleteRecord="deleteRecord"
          @sortRecord="sortRecord"
        />
        <div class="ml-8">
          <PaginationTable
            :total-records="data?.total || 0"
            :current-page="page"
            :paginate="paginate"
          ></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
