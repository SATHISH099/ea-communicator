<script lang="ts" setup>
import moment from 'moment';
import { useToasterStore } from '~~/store/toaster';

const page = ref(1);
const pageSize = ref(10);
const isDelete = ref(false);
const search = ref('');
const orderType = ref('desc');
const orderBy = ref('id');
const searchField = ref('');
const { setMessage } = useToasterStore();

const messageHeaders = [
  'Sender',
  'Subject',
  'Recipients',
  'Groups',
  'Email Message',
  { value: 'Sent Date', isSort: true, key: 'createdAt' },
  '',
];

const { $trpc } = useNuxtApp();

const { data, refresh } = await useAsyncData(
  () =>
    $trpc.sms.list.query({
      search: search.value,
      pageNumber: page.value,
      pageSize: pageSize.value,
    }),
  {
    transform: ({ total, data }) => ({
      total,
      data: data.map(
        ({ id, sender, title, message, recipients, groups, createdAt }: any) => ({
          id: id,
          sender: sender?.name,
          title,
          recipients: recipients.length,
          groups: groups.length,
          message,
          createdAt: moment(createdAt).format('dddd, Do MMMM YYYY h:mm A'),
        }),
      ),
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

const sortRecord = (key: string) => {
  orderType.value = orderType.value === 'desc' ? 'asc' : 'desc';
  orderBy.value = key;
  refresh();
};

const setPerPage = (perPage: number) => {
  pageSize.value = perPage;
  refresh();
};

const deleteRecord = async (id: number) => {
  const response = await $trpc.sms.delete.mutate(id);
  refresh();
  isDelete.value = response.affected !== undefined;
};

const bulkDelete = async (data: number[]) => {
  try {
    const response = await $trpc.sms.bulkDelete.mutate(
      data.map(function (item) {
        return Number(item);
      }),
    );
    if (response) {
      setMessage('Bulk Deleted successfully.', 'success');
      refresh();
    } else {
      setMessage('Something went wrong unable to create Email.', 'error');
    }
  } catch (error) {
    console.error(new Error('Whoops, something went wrong.'));
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
    <div class="md:flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">SMS</h4>
        <p class="text-silver">
          <NuxtLink to="/" class="text-silver sub-heading"
            >Communicator</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink to="/email-messages" class="text-silver sub-heading">
            Email/Messages</NuxtLink
          >
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">SMS</span>
        </p>
      </div>
      <div class="flex mt-10 md:mt-0">
        <NuxtLink
          :to="{ name: 'email-messages-sms-add' }"
          class="btn btn-primary btn-create w-full flex justify-center"
          >Create New SMS</NuxtLink
        >
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="success alert-success" v-if="isDelete">
        SMS Successfully Deleted
      </div>
      <div class="p-6">
        <div class="flex flex-wrap items-center gap-4">
          <FormKit
            prefix-icon="search"
            type="search"
            v-model="searchField"
            placeholder="Search"
            input-class="form-control pl-[3.5rem]"
            prefix-icon-class="search-icon"
            outer-class="md:w-[34rem] w-full search-field"
            v-on:keyup.enter="searchKeyword"
            @input="searchEmpty"
          />
          <button class="btn btn-primary md:w-30 w-full" @click="searchKeyword">
            Search
          </button>
        </div>
      </div>
      <div class="pb-10 pt-5 overflow-auto scroll relative">
        <DashboardTable
          :headers="messageHeaders"
          :rows="data?.data"
          type="sms"
          :show-bulk-delete="true"
          :dropDownOption="{ isView: true, isEdit: false, isDelete: true }"
          @bulkDelete="bulkDelete"
          @onDeleteRecord="deleteRecord"
          @sortRecord="sortRecord"
        />
        <div class="ml-8">
          <PaginationTable
            :totalRecords="data?.total"
            :currentPage="page"
            :pageSize="pageSize"
            @setPerPage="setPerPage"
            v-bind:paginate="paginate"
          ></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
