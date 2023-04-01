<script lang="ts" setup>
import moment from 'moment';
import { useToasterStore } from '~~/store/toaster';

const page = ref(1);
const pageSize = ref(10);
const isDelete = ref(false);
const search = ref('');
const orderType = ref<'desc' | 'asc'>('desc');
const orderBy = ref('id');
const searchField = ref('');
const { setMessage } = useToasterStore();
const user = useCurrentUser();

const messageHeaders = [
  'Sender',
  'Subject',
  'Recipients',
  'Groups',
  'Email Message',
  { value: 'Sent At', isSort: true, key: 'createdAt' },
  '',
];

const { $trpc } = useNuxtApp();

const { data, refresh } = await useAsyncData(
  () =>
    $trpc.sms.list.query({
      orderType: orderType.value,
      search: search.value,
      orderBy: orderBy.value,
      pageSize: pageSize.value,
      pageNumber: page.value,
    }),
  {
    transform: ({ total, data }) => ({
      total,
      data: data.map(
        ({
          id,
          sender,
          title,
          message,
          recipients,
          groups,
          createdAt,
        }: any) => ({
          id,
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
  try {
    const response = await $trpc.sms.delete.mutate(id);
    refresh();
    isDelete.value = response.affected !== undefined;
    setMessage('SMS Deleted Successfully', 'success');
  } catch (error) {
    console.error(error);
  }
};

const bulkDelete = async (data: number[]) => {
  try {
    const response = await $trpc.sms.bulkDelete.mutate(
      data.map(function (item) {
        return Number(item);
      }),
    );
    if (response) {
      setMessage('Deleted successfully', 'success');
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
      <div v-if="!user.hasRole('team-member')" class="flex mt-10 md:mt-0">
        <NuxtLink
          :to="{ name: 'email-messages-sms-add' }"
          class="btn btn-primary btn-create w-full flex justify-center"
          >Create New SMS</NuxtLink
        >
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div v-if="isDelete" class="success alert-success">
        SMS Successfully Deleted
      </div>
      <div class="p-6">
        <div class="flex flex-wrap items-center gap-4">
          <FormKit
            v-model="searchField"
            prefix-icon="search"
            type="search"
            placeholder="Search"
            input-class="form-control pl-[3.5rem]"
            prefix-icon-class="search-icon"
            outer-class="md:w-[34rem] w-full search-field"
            @keyup.enter="searchKeyword"
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
          :drop-down-option="{
            isView: true,
            isEdit: false,
            isDelete: user.hasRole('admin'),
          }"
          @bulkDelete="bulkDelete"
          @onDeleteRecord="deleteRecord"
          @sortRecord="sortRecord"
        />
        <div class="ml-8">
          <PaginationTable
            :total-records="data?.total"
            :current-page="page"
            :page-size="pageSize"
            :paginate="paginate"
            entity="SMS"
            @setPerPage="setPerPage"
          ></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
