<script lang="ts" setup>
const config = useRuntimeConfig();
const page = ref(1);
const search = ref('');
const searchField = ref('');

const groupHeaders = ['Group Name', 'Group Status'];

interface GroupData {
  groupName: string;
  status: boolean;
}
const { data, refresh } = await useFetch<any>(
  () => `groups?search=${search.value}&pageNumber=${page.value}&pageSize=10`,
  {
    baseURL: config.public.API_SMARTSUITE_BASE_URL,
    transform: ({ total, data }) => ({
      total,
      data: data.map(({ groupName, status }: GroupData) => ({
        groupName,
        status,
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
</script>

<template>
  <div>
    <div class="bg-white small-shadow">
      <div class="p-6">
        <h5 text-stone mb-8>Group's list</h5>
        <div class="flex flex-wrap items-center gap-4">
          <FormKit
            v-model="searchField"
            prefix-icon="search"
            type="search"
            placeholder="Search"
            input-class="form-control pl-[3.5rem]"
            prefix-icon-class="search-icon"
            outer-class="search-field w-full"
            @input="searchKeyword"
          />
        </div>
      </div>
      <div class="pb-10">
        <DashboardTable :headers="groupHeaders" :rows="data.data" />
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
