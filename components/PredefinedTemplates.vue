<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String as PropType<'email' | 'sms'>,
    default: 'email',
  },
  use: {
    type: Function,
    default: () => {},
  },
});

const messageHeaders = ['Title', 'Message'];
const search = ref('');
const searchField = ref('');
const page = ref(1);
const { $trpc } = useNuxtApp();

const { data, refresh } = await useAsyncData(
  (): any =>
    $trpc[props.type].list.query({
      search: search.value,
      pageNumber: page.value,
    }),
  {
    transform: ({ total, data }: any) => ({
      total,
      data: data.map((x: any) => ({
        title: x.subject || x.title,
        message: x.body?.replace(/(<([^>]+)>)/gi, '') || x.message,
      })),
    }),
  },
);

watch(
  () => props.type,
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
</script>

<template>
  <div>
    <div bg-white small-shadow>
      <div px-6 pt-6>
        <h5 text-stone mb-5>Predefined Templates</h5>
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
        :rows="data?.data || []"
        :isDropdown="false"
        :isTemplateDefine="true"
        :use="use"
      />
      <div class="px-6 pb-6">
        <PaginationTable
          :totalRecords="data?.total || 0"
          :currentPage="page"
          v-bind:paginate="paginate"
        ></PaginationTable>
      </div>
    </div>
  </div>
</template>
