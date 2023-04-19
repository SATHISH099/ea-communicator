<script lang="ts" setup>
const props = defineProps(['recipients']);
defineEmits(['setRecipients']);

const page = ref(1);
const pageSize = ref(10);
const search = ref('');
const searchField = ref('');
const mainCheck = ref([]);
const mainChecked = ref(false);
const { setLoader } = useLoader();

interface RecipientData {
  id: number;
  name: string;
}

interface initialStateData {
  recipients: RecipientData[];
}

const initialState: initialStateData = {
  recipients: props.recipients || [],
};

setLoader(true);
const recipientService = useService('recipient');
if (process.client) {
  recipientService.setAuth();
}

const form = reactive({ ...initialState });
const { data, refresh } = await useAsyncData(
  () =>
    recipientService.getAll({
      search: search.value,
      pageSize: pageSize.value,
      pageNumber: page.value,
    }),
  {
    server: false,
    transform: ({ total, data }) => ({
      total,
      data: data.map(({ id, name }: RecipientData) => ({
        id,
        name,
      })),
    }),
  },
);

setLoader(false);

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
  form.recipients = [];

  mainChecked.value = mainCheck.value.length > 0;
  if (mainChecked.value) {
    data.value?.data?.forEach((value: RecipientData) => {
      form.recipients.push(value);
    });
  }
};
</script>

<template>
  <div>
    <div class="bg-white small-shadow pb-8">
      <div class="p-6">
        <h5 text-stone mb-8>Recipient's list</h5>
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
            :options="[{ value: true, label: 'Recipients' }]"
            outer-class="recipient-checkbox"
            @input="toggleChecked"
          />
        </div>
      </div>
      <div>
        <FormKit
          v-model="form.recipients"
          type="checkbox"
          :current-page="page"
          :options="
                  data?.data?.map((recipientItem: RecipientData) => {
                    return {
                      value: recipientItem,
                      label: `${recipientItem.name}`,
                    };
                  }) || []
                "
          outer-class="recipient-list"
          input-class="form-check-input mr-2"
          @input="$emit('setRecipients', form.recipients)"
        />
      </div>
      <div class="ml-8">
        <PaginationTable
          :total-records="data?.total || 0"
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
        display: flex;
        :first-child {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
