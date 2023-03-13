<script lang="ts" setup>
import type { Email } from '~~/services/email.service';
import type { Sms } from '~~/services/sms.service';
import type { Message } from '~~/services/message.service';
import type { Recipient } from '~~/services/recipient.service';
import type { Group } from '~~/services/group.service';

const config = useRuntimeConfig();
const page = ref(1);
const type = ref('emails');
const orderType = ref('desc');
const orderBy = ref('id');
const search = ref('');
const startDate = ref<string | null>('');
const endDate = ref<string | null>('');
const searchField = ref('');

const messageHeaders = [
  { value: 'Id', isSort: true, key: 'id' },
  'Sender',
  'Title',
  'Recipients',
  'Groups',
  'Message',
  { value: 'Sent Date', isSort: true, key: 'createdAt' },
  '',
];

interface GroupRecipientData {
  recipients: Recipient[];
  groups: Group[];
}

const { data, refresh } = await useFetch<any>(
  () =>
    `${type.value}?search=${search.value}&pageNumber=${page.value}&pageSize=10&startDate=${startDate.value}&endDate=${endDate.value}&orderType=${orderType.value}&orderBy=${orderBy.value}`,
  {
    baseURL: config.public.API_BASE_URL,
    transform: (data) => {
      return {
        total: data.total,
        data: data.data.map(
          (message: Email & Sms & Message & GroupRecipientData) => ({
            id: message.id,
            sender: message.sender,
            subject: message.subject || message.title,
            recipients: message.recipients.length,
            groups: message.groups.length,
            body: message.body || message.message,
            createdAt: message.createdAt,
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

const setDate = (dateStr: string[] | null) => {
  if (!dateStr) {
    startDate.value = '';
    endDate.value = '';
  } else {
    startDate.value = dateStr[0];
    endDate.value = dateStr[1];
  }

  refresh();
};
</script>

<template>
  <div>
    <div class="md:flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">History</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span>/</span>

          <span class="text-primary ml-1">History </span>
        </p>
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="p-6">
        <div class="flex flex-wrap justify-between items-center gap-4">
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
            <button
              class="btn btn-primary md:w-30 w-full"
              @click="searchKeyword"
            >
              Search
            </button>
          </div>
          <div class="flex items-center gap-3">
            <DatePicker @setDate="setDate"></DatePicker>
            <FormKit
              v-model="type"
              input-class="form-control"
              type="select"
              name="predefined_messages"
              placeholder="Category"
              :options="[
                {
                  value: 'emails',
                  label: 'Email',
                },
                {
                  value: 'sms',
                  label: 'Sms',
                },
                {
                  value: 'messages',
                  label: 'Alert',
                },
              ]"
            />
          </div>
        </div>
      </div>
      <div class="pb-10 pt-5">
        <DashboardTable
          :headers="messageHeaders"
          :rows="data.data"
          type="email"
          @sortRecord="sortRecord"
          :dropDownOption="{ isView: true, isEdit: false, isDelete: false }"
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
