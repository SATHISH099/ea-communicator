<script lang="ts" setup>
import type { Sms } from '~~/services/sms.service';
const config = useRuntimeConfig();
const page = ref(1);
const isDelete = ref(false);
const search = ref('');
const orderType = ref('desc');
const orderBy = ref('id');
const searchField = ref('');
const smsService = useService('sms');

const messageHeaders = [
  { value: 'Id', isSort: true, key: 'id' },
  'Sender',
  'Subject',
  'Recipients',
  'Groups',
  'Email Message',
  { value: 'Sent Date', isSort: true, key: 'createdAt' },
  '',
];

const { data, refresh } = await useFetch<any>(
  () =>
    `sms?search=${search.value}&pageNumber=${page.value}&pageSize=10&orderType=${orderType.value}&orderBy=${orderBy.value}`,
  {
    baseURL: config.public.API_BASE_URL,
    transform: (data) => {
      return {
        total: data.total,
        data: data.data.map(
          ({ id, sender, title, message, createdAt }: Sms) => ({
            id,
            sender,
            title,
            recipients: 0,
            groups: 0,
            message,
            createdAt,
          }),
        ),
      };
    },
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

const sortRecord = (key: string) => {
  orderType.value = orderType.value === 'desc' ? 'asc' : 'desc';
  orderBy.value = key;
  refresh();
};

const deleteRecord = async (id: number) => {
  const response = await smsService.delete(id);
  refresh();
  isDelete.value = response.affected;
};
</script>

<template>
  <div>
    <div class="md:flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">SMS</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Email / Messages</span>
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
          />
          <button class="btn btn-primary md:w-30 w-full" @click="searchKeyword">
            Search
          </button>
        </div>
      </div>
      <div class="pb-10 pt-5 overflow-auto scroll relative">
        <DashboardTable
          :headers="messageHeaders"
          :rows="data.data"
          type="sms"
          @onDeleteRecord="deleteRecord"
          @sortRecord="sortRecord"
        />
        <div class="ml-8">
          <PaginationTable
            :totalRecords="data.total"
            :currentPage="page"
            v-bind:paginate="paginate"
          ></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
