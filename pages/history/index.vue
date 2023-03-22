<script lang="ts" setup>
import moment from 'moment';

const { $trpc } = useNuxtApp();
const page = ref(1);
const type = ref<'email' | 'sms' | 'message'>('email');
const orderType = ref<'desc' | 'asc'>('desc');
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

const { data, refresh } = await useAsyncData(
  (): any =>
    $trpc[type.value].list.query({
      search: search.value,
      pageNumber: page.value,
      pageSize: 10,
      orderType: orderType.value,
      orderBy: orderBy.value,
    }),
  {
    transform: ({ data, total }: any) => ({
      total,
      data: data.map((message: any) => ({
        id: message.id,
        sender: message.sender?.name,
        subject: message.subject || message.title,
        recipients: message.recipients.length,
        groups: message.groups.length,
        body: message.body || message.message,
        createdAt: message.createdAt,
      })),
    }),
  },
);

watch(
  () => type.value,
  () => {
    refresh();
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
    startDate.value = dateStr[0] ? moment(dateStr[0]).format('YYYY-MM-DD') : '';
    endDate.value = dateStr[1] ? moment(dateStr[1]).format('YYYY-MM-DD') : '';
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
          <NuxtLink to="/" class="text-silver sub-heading"
            >Communicator</NuxtLink
          >
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
              v-model="searchField"
              prefix-icon="search"
              type="search"
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
                  value: 'email',
                  label: 'Email',
                },
                {
                  value: 'sms',
                  label: 'Sms',
                },
                {
                  value: 'message',
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
          :rows="data?.data || []"
          :type="type"
          :drop-down-option="{ isView: true, isEdit: false, isDelete: false }"
          @sortRecord="sortRecord"
          :actions="{
            view: '/email-messages/[module]/[id]',
          }"
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
