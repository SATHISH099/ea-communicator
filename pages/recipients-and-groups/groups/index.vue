<script lang="ts" setup>
const config = useRuntimeConfig();
const page = ref(1);
const search = ref('');
const searchField = ref('');
const messageHeaders = [
  'Group Name',
  'Members',
  'Status',
  'Location',
  'Created Date',
  'Updated Date',
];

interface GroupData {
  groupName: string;
  members: number;
  status: string;
  location: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string | null;
}

const { data, refresh } = await useFetch<any>(
  () => `groups?search=${search.value}&pageNumber=${page.value}&pageSize=10`,
  {
    baseURL: config.public.API_SMARTSUITE_BASE_URL,
    transform: (data) => {
      return {
        total: data.total,
        data: data.data.map((x: GroupData) => ({
          groupName: x.groupName,
          members: 0,
          status: x.status ? 'Active' : 'Inactive',
          location: `${x.location}, ${x.city}, ${x.state}, ${x.country}, ${x.zipCode}`,
          createdAt: x.createdAt,
          updatedAt: x.updatedAt || null,
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
        <h4 class="mb-4 text-stone">Groups</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Recipients and Groups</span>
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Groups</span>
        </p>
      </div>
      <div md:w-auto w-full>
        <NuxtLink
          :to="{ name: 'recipients-and-groups-groups-create' }"
          class="btn btn-primary block md:w-auto w-full text-center"
          >Create New Group</NuxtLink
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
        </div>
      </div>
      <div class="pb-10 pt-5">
        <DashboardTable :headers="messageHeaders" :rows="data.data" />
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
