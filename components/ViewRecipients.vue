<script lang="ts" setup>
const messageHeaders = ['First Name', 'Last Name'];
const search = ref('');
const searchField = ref('');
const page = ref(1);
const config = useRuntimeConfig();

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
          lastName: x.lastName,
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
    <div bg-white small-shadow>
      <div px-6 pt-6>
        <h5 text-stone mb-5>Recipient's List</h5>
        <FormKit
          prefix-icon="search"
          v-model="searchField"
          type="search"
          placeholder="Search"
          input-class="form-control pl-[3.5rem]"
          prefix-icon-class="search-icon"
          @change="searchKeyword"
        />
      </div>
      <DashboardTable
        mt-3
        mb-8
        :headers="messageHeaders"
        :rows="data.data"
        :isDropdown="false"
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
</template>
