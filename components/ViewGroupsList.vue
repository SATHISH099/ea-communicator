<script lang="ts" setup>
const props = defineProps(['groups']);
defineEmits(['setGroups']);

const page = ref(1);
const pageSize = ref(10);
const search = ref('');
const searchField = ref('');
const mainCheck = ref([]);
const mainChecked = ref(false);

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
      data: data.map((x: GroupData) => ({
        id: x.id,
        groupName: x.groupName,
        status: x.status,
      })),
    }),
    server: false,
  },
);

const form = reactive({ ...initialState });

const searchKeyword = () => {
  search.value = searchField.value;
  page.value = 1;
  refresh();
};

const paginate = (pg: number) => {
  page.value = pg;
  refresh();
};

const setPerPage = (perPage: number) => {
  pageSize.value = perPage;
  refresh();
};

const toggleChecked = () => {
  form.groups = [];

  mainChecked.value = mainCheck.value.length > 0;
  if (mainChecked.value) {
    data.value?.data?.forEach((value: GroupData) => {
      form.groups.push(value);
    });
  }
};
</script>

<template>
  <div>
    <div class="bg-white small-shadow pb-8">
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
      <div>
        <div>
          <FormKit
            v-model="mainCheck"
            type="checkbox"
            input-class="form-check-input"
            :options="[{ value: true, label: 'Select All Groups' }]"
            outer-class="recipient-checkbox"
            @input="toggleChecked"
          />
        </div>
      </div>
      <div>
        <FormKit
          v-model="form.groups"
          type="checkbox"
          :current-page="page"
          :options="
                  data?.data.map((groupItem: GroupData) => {
                    return {
                      value: groupItem,
                      label: `${groupItem.groupName}`,
                    };
                  }) || []
                "
          outer-class="recipient-list"
          input-class="form-check-input mr-2"
          @input="$emit('setGroups', form.groups)"
        />
      </div>
      <div class="ml-8">
        <PaginationTable
          :total-records="data?.total || []"
          :current-page="page"
          :paginate="paginate"
          @setPerPage="setPerPage"
        ></PaginationTable>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.recipient-checkbox {
  .formkit-fieldset {
    margin-bottom: 25px;
    margin-left: 24px;
    border: none;
    ul {
      list-style: none;
      .formkit-wrapper {
        cursor: pointer;
        display: flex;
        :first-child {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
