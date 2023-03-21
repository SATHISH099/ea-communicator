<script lang="ts" setup>
const props = defineProps(['groups']);
defineEmits(['setGroups']);
const config = useRuntimeConfig();
const page = ref(1);
const search = ref('');
const searchField = ref('');

interface GroupData {
  id: number;
  groupName: string;
  status: boolean;
}

interface initialStateData {
  groups: GroupData[];
}

const initialState: initialStateData = {
  groups: props.groups || [],
};

const form = reactive({ ...initialState });
const { data, refresh } = await useFetch<any>(
  () => `groups?search=${search.value}&pageNumber=${page.value}&pageSize=10`,
  {
    baseURL: config.public.API_SMARTSUITE_BASEURL,
    transform: ({ total, data }) => ({
      total,
      data: data.map((x: GroupData) => ({
        id: x.id,
        groupName: x.groupName,
        status: x.status,
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
        <div>
          <FormKit
            v-model="form.groups"
            type="checkbox"
            :options="
                  data.data.map((groupItem: GroupData) => {
                    return {
                      value: groupItem,
                      label: `${groupItem.groupName}`,
                    };
                  })
                "
            outer-class="recipient-list"
            input-class="form-check-input mr-2"
            @input="$emit('setGroups', form.groups)"
          />
        </div>
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
