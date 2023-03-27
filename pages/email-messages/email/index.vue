<script lang="ts" setup>
import moment from 'moment';
import { useToasterStore } from '~~/store/toaster';
import { stripHtml } from '~~/utils/common';

const page = ref(1);
const pageSize = ref(10);
const isDelete = ref(false);
const orderType = ref<'desc' | 'asc'>('desc');
const orderBy = ref('id');
const search = ref('');
const searchField = ref('');
const { setMessage } = useToasterStore();

const MessageHeaders = [
  'ID',
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
    $trpc.email.list.query({
      orderType: orderType.value,
      search: search.value,
      orderBy: orderBy.value,
      pageSize: pageSize.value,
      pageNumber: page.value,
    }),
  {
    transform: ({ data, total }) => ({
      total,
      data: data.map(
        ({
          id,
          sender,
          subject,
          recipients,
          groups,
          body,
          createdAt,
        }: any) => ({
          id,
          sender: sender?.name,
          subject,
          recipients: recipients.length,
          groups: groups.length,
          body: stripHtml(body),
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

const deleteRecord = async (id: number) => {
  try {
    const response = await $trpc.email.delete.mutate(id);
    refresh();
    isDelete.value = response.affected !== undefined;
    setMessage('Email Deleted Successfully.', 'success');
  } catch (error) {
    console.error(error);
  }
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

const searchEmpty = () => {
  if (!searchField.value) {
    search.value = '';
    orderBy.value = 'id';
    refresh();
  }
};

const bulkDelete = async (data: number[]) => {
  try {
    const response = await $trpc.email.bulkDelete.mutate(
      data.map(function (item) {
        return Number(item);
      }),
    );
    if (response) {
      setMessage('Deleted successfully.', 'success');
      refresh();
    } else {
      setMessage('Something went wrong unable to create Email.', 'error');
    }
  } catch (error) {
    console.error(new Error('Whoops, something went wrong.'));
  }
};
</script>

<template>
  <div>
    <div class="md:flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">Email</h4>
        <p class="text-silver">
          <NuxtLink to="/" class="text-silver sub-heading"
            >Communicator</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink to="/email-messages" class="text-silver sub-heading">
            Email/Messages</NuxtLink
          >
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Email</span>
        </p>
      </div>
      <div class="flex mt-10 md:mt-0">
        <NuxtLink
          :to="{ name: 'email-messages-email-add' }"
          class="btn btn-primary btn-create w-full flex justify-center"
          >Compose New Email</NuxtLink
        >
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="success alert-success" v-if="isDelete">
        Email Successfully Deleted
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
              v-on:keyup.enter="searchKeyword"
              @input="searchEmpty"
            />
            <button
              class="btn btn-primary md:w-30 w-full"
              @click="searchKeyword"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="pb-10 pt-5 overflow-auto scroll">
        <DashboardTable
          :headers="MessageHeaders"
          :rows="data?.data || []"
          type="email"
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
            v-bind:paginate="paginate"
            @setPerPage="setPerPage"
            entity="Emails"
          ></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
