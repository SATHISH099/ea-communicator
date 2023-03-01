<script lang="ts" setup>
import Multiselect from '@vueform/multiselect/src/Multiselect';
import type { Sms } from '~~/services/sms.service';
import type { Email } from '~~/services/email.service';

const config = useRuntimeConfig();
const type = ref('emails');
const page = ref(1);
const search = ref('');
const searchField = ref('');

const MessageHeaders = [
  { value: 'Title', image: '/arrow-and-direction.png' },
  'Message',
  { value: 'Created Date', image: '/arrow-and-direction.png' },
];

const { data, refresh } = await useFetch<any>(
  () =>
    `${type.value}?search=${search.value}&pageNumber=${page.value}&pageSize=10&isPredefined=true`,
  {
    baseURL: config.public.API_BASE_URL,
    transform: (data) => {
      return {
        total: data.total,
        data: data.data.map((x: any) => ({
          title: x.title ?? x.subject,
          message: x.body ?? x.message,
          sentDate: x.createdAt,
        })),
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

const optionTypeSelected = (option: string) => {
  type.value = option;
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
        <DashboardTable :headers="MessageHeaders" :rows="data.data" />
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
