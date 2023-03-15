<script lang="ts" setup>
import moment from 'moment';
import type { Message } from '~~/services/message.service';
import type { Recipient } from '~~/services/recipient.service';
import type { Group } from '~~/services/group.service';

const config = useRuntimeConfig();
const messageService = useService('message');
const page = ref(1);
const orderType = ref('desc');
const orderBy = ref('id');
const isDelete = ref(false);
const search = ref('');
const searchField = ref('');

const { $trpc } = useNuxtApp();

interface GroupRecipientData {
  recipients: Recipient[];
  groups: Group[];
}

const MessageHeaders = [
  'Id',
  'Sender',
  'Subject',
  'Recipients',
  'Groups',
  'Alert Message',
  { value: 'Sent Date', isSort: true, key: 'createdAt' },
  '',
];

const { data, refresh } = $trpc.message.findAll.useQuery(
  {},
  {
    baseURL: config.public.API_BASEURL,
    transform: (data) => {
      return {
        total: data.total,
        data: data.data.map(
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
            sender,
            title,
            recipients: recipients.length,
            groups: groups.length,
            message,
            createdAt: moment(createdAt).format('dddd, Do MMMM YYYY h:mm A'),
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

const deleteRecord = async (id: number) => {
  const response = await $trpc.message.delete.mutate(id);
  refresh();
  isDelete.value = response.affected !== undefined;
};

const sortRecord = (key: string) => {
  orderType.value = orderType.value === 'desc' ? 'asc' : 'desc';
  orderBy.value = key;
  refresh();
};
</script>

<template>
  <div>
    <div class="md:flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">Messages</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Email / Messages</span>
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Messages</span>
        </p>
      </div>
      <div class="flex mt-10 md:mt-0">
        <NuxtLink
          :to="{ name: 'email-messages-alert-add' }"
          class="btn btn-primary btn-create w-full flex justify-center"
          >Create New Messages</NuxtLink
        >
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="p-6">
        <div class="flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-wrap items-center gap-4">
            <FormKit
              prefix-icon="search"
              type="search"
              placeholder="Search"
              v-model="searchField"
              input-class="form-control pl-[3.5rem]"
              prefix-icon-class="search-icon"
              outer-class="md:w-[34rem] w-full search-field"
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
      <div class="pb-10 pt-5">
        <DashboardTable
          :headers="MessageHeaders"
          :rows="data.data"
          type="alert"
          @onDeleteRecord="deleteRecord"
          @sortRecord="sortRecord"
          :dropDownOption="{ isView: true, isEdit: false, isDelete: true }"
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
