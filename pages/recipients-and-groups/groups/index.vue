<script lang="ts" setup>
import moment from 'moment';
import { useToasterStore } from '~~/store/toaster';
const { setMessage } = useToasterStore();

const page = ref(1);
const pageSize = ref(10);
const search = ref('');
const searchField = ref('');
const messageHeaders = [
  'ID',
  'Group Name',
  'Members',
  'Status',
  'Location',
  'Created Date',
  '',
];

const groupService = useService('group');
if (process.client) {
  groupService.setAuth();
}

const { data, refresh } = await useAsyncData(
  () =>
    groupService.getAll({
      search: search.value,
      pageSize: pageSize.value,
      pageNumber: page.value,
    }),
  {
    transform: ({ total, data }) => ({
      total,
      data: data.map(
        ({
          id,
          groupName,
          status,
          location,
          recipientCount,
          createdAt,
        }: any) => ({
          id,
          groupName,
          members: recipientCount,
          status: status ? 'Active' : 'Inactive',
          location: location
            ? [
                location.address,
                location.city,
                location.state,
                location.country,
              ]
                .filter((v) => v)
                .join(', ')
            : '-',
          createdAt: moment(createdAt).format('dddd, Do MMMM YYYY h:mm A'),
        }),
      ),
    }),
    server: false,
  },
);

const searchKeyword = () => {
  search.value = searchField.value;
  page.value = 1;

  if (search.value) refresh();
};

const paginate = (pg: number) => {
  page.value = pg;
  refresh();
};

const setPerPage = (perPage: number) => {
  pageSize.value = perPage;
  refresh();
};

const deleteRecord = async (id: number) => {
  try {
    await groupService.delete(id);
    setMessage('Group Deleted Successfully', 'success');
    refresh();
  } catch (error) {
    console.error(error);
  }
};

const searchEmpty = () => {
  if (!searchField.value) {
    search.value = '';
    refresh();
  }
};
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-between items-center mb-0 md:mb-10">
      <div md:mb-0 mb-10>
        <h4 class="mb-4 text-stone">Groups</h4>
        <p class="text-silver">
          <NuxtLink to="/" class="text-silver sub-heading"
            >Communicator</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink to="/recipients-and-groups" class="text-silver sub-heading">
            Recipients and Groups</NuxtLink
          >
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
              v-model="searchField"
              prefix-icon="search"
              type="search"
              placeholder="Search"
              input-class="form-control pl-[3.5rem]"
              prefix-icon-class="search-icon"
              outer-class="md:w-[34rem] w-full search-field"
              @keyup.enter="searchKeyword"
              @input="searchEmpty"
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
          :headers="messageHeaders"
          :rows="data?.data || []"
          type="groups"
          @on-delete-record="deleteRecord"
        />
        <div class="ml-8">
          <PaginationTable
            :total-records="data?.total || 0"
            :current-page="page"
            :paginate="paginate"
            entity="Groups"
            @set-per-page="setPerPage"
          ></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
