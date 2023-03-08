<script lang="ts" setup>
import Multiselect from '@vueform/multiselect/src/Multiselect';
import type { Sms } from '~~/services/sms.service';
import type { Email } from '~~/services/email.service';

const smsService = useService('sms');
const emailService = useService('email');
type Message = Sms & Email;
const config = useRuntimeConfig();
const type = ref('emails');
const page = ref(1);
const isDelete = ref(false);
const orderType = ref('desc');
const orderBy = ref('id');
const search = ref('');
const searchField = ref('');

const MessageHeaders = [
  { value: 'Id', isSort: true, key: 'id' },
  'Title',
  'Message',
  { value: 'Created Date', isSort: true, key: 'createdAt' },
];

const { data, refresh } = await useFetch<any>(
  () =>
    `${type.value}?search=${search.value}&pageNumber=${page.value}&pageSize=10&isPredefined=true&orderType=${orderType.value}&orderBy=${orderBy.value}`,
  {
    baseURL: config.public.API_BASE_URL,
    transform: (data) => ({
      total: data.total,
      data: data.data.map((message: Message) => ({
        id: message.id,
        title: type.value === 'emails' ? message.subject : message.title,
        message: type.value === 'emails' ? message.body : message.message,
        sentDate: message.createdAt,
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
  const response =
    type.value === 'emails'
      ? await emailService.delete(id)
      : await smsService.delete(id);
  refresh();
  isDelete.value = response.affected;
};

const sortRecord = (key: string) => {
  orderType.value = orderType.value === 'desc' ? 'asc' : 'desc';
  orderBy.value = key;
  refresh();
};

const optionTypeSelected = (option: string) => {
  type.value = option;
  orderBy.value = 'id';
  refresh();
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
          <div class="flex flex-wrap items-center gap-3 md:w-auto w-full">
            <Multiselect
              placeholder="Predefined Type"
              v-model="type"
              @select="optionTypeSelected"
              :options="['emails', 'sms']"
              class="md:w-[14rem] w-full"
            />
          </div>
        </div>
      </div>
      <div class="pb-10 pt-5">
        <DashboardTable
          :headers="MessageHeaders"
          :rows="data.data"
          type="predefined-templates"
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
