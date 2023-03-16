<script lang="ts" setup>
import moment from 'moment';
const page = ref(1);
const isDelete = ref(false);
const orderType = ref('desc');
const orderBy = ref('id');
const search = ref('');
const searchField = ref('');

const MessageHeaders = [
  { value: 'Id', isSort: true, key: 'id' },
  'Sender',
  'Subject',
  'Recipients',
  'Groups',
  'Email Message',
  { value: 'Sent Date', isSort: true, key: 'createdAt' },
  '',
];

const { $trpc } = useNuxtApp();

const { data, refresh } = await $trpc.email.list.useQuery(
  {
    search: search.value,
    pageNumber: page.value,
  },
  {
    transform: (data) => {
      return {
        total: data.total,
        data: data.data.map(
          ({
            id,
            sender,
            subject,
            recipients,
            groups,
            body,
            createdAt,
          }: any) => ({
            id,
            sender: sender?.name,
            subject,
            recipients: recipients.length,
            groups: groups.length,
            body,
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
  const response = await $trpc.email.delete.mutate(id);
  refresh();
  isDelete.value = response.affected !== undefined;
};

const sortRecord = (key: string) => {
  orderType.value = orderType.value === 'desc' ? 'asc' : 'desc';
  orderBy.value = key;
  refresh();
};

const searchEmpty = () => {
  if (!searchField.value) {
    search.value = '';
    orderBy.value = 'id';
    refresh();
  }
};
</script>

<template>
  <div>
    <div class="md:flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">Email</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Email / Messages</span>
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Email</span>
        </p>
      </div>
      <div class="flex mt-10 md:mt-0">
        <NuxtLink
          :to="{ name: 'email-messages-email-add' }"
          class="btn btn-primary btn-create w-full flex justify-center"
          >Compose New Email</NuxtLink
        >
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="success alert-success" v-if="isDelete">
        Email Successfully Deleted
      </div>
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
      <div class="pb-10 pt-5 overflow-auto scroll">
        <DashboardTable
          :headers="MessageHeaders"
          :rows="data?.data || []"
          type="email"
          :show-bulk-delete="true"
          @onDeleteRecord="deleteRecord"
          @sortRecord="sortRecord"
          :dropDownOption="{ isView: true, isEdit: false, isDelete: true }"
        />
        <div class="ml-8">
          <PaginationTable
            :totalRecords="data?.total"
            :currentPage="page"
            v-bind:paginate="paginate"
          ></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
