<script lang="ts" setup>
import type { Recipient } from '~~/services/recipient.service';

const recipientService = useService('recipient');

async function deleteRecipient(id: number) {
  try {
    await recipientService.delete(id);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

const config = useRuntimeConfig();
const page = ref(1);
const search = ref('');
const searchField = ref('');

const recipientHeaders = [
  'Full Name',
  'Nick name',
  'Mobile phone for voice calls',
  'Mobile phone for SMS',
  'Home phone number',
  'Work phone Number',
  'Primary email',
  'Alternate email',
  'Address',
];

const { data, refresh } = await useFetch<any>(
  () =>
    `recipients?search=${search.value}&pageNumber=${page.value}&pageSize=10`,
  {
    baseURL: config.public.API_SMARTSUITE_BASE_URL,
    transform: (data) => {
      return {
        total: data.total,
        data: data.data.map((x: any) => ({
          firstName: x.firstName,
          nickName: x.nickName,
          cellVoice: x.cellVoice,
          cellText: x.cellText,
          homeNumber: x.homeNumber,
          workNumber: x.workNumber,
          emailAddress: x.emailAddress,
          alternateEmail: x.alternateEmail,
          location: x.location,
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
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-between items-center mb-10">
      <div md:mb-0 mb-10>
        <h4 class="mb-4 text-stone">Recipients</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Recipients and Groups</span>
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Recipients</span>
        </p>
      </div>
      <div md:w-auto w-full>
        <NuxtLink
          :to="{ name: 'recipients-and-groups-recipients-add' }"
          class="btn btn-primary block md:w-auto w-full text-center"
          >Add New Recipient</NuxtLink
        >
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
              outer-class="search-field md:w-[34rem] w-full"
            />
            <button
              class="btn btn-primary md:w-auto w-full"
              @click="searchKeyword"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="pb-10 pt-5">
        <DashboardTable :headers="recipientHeaders" :rows="data.data" />
        <div class="ml-8">
          <PaginationTable
            :total-records="data.total"
            :current-page="page"
            :paginate="paginate"
          ></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
