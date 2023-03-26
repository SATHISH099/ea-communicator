<script lang="ts" setup>
const props = defineProps(['recipients']);
defineEmits(['setRecipients']);
const config = useRuntimeConfig();
const page = ref(1);
const search = ref('');
const searchField = ref('');
const mainCheck = ref([]);
const mainChecked = ref(false);

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

const form = reactive({ ...initialState });
const { data, refresh } = await useFetch<any>(
  () =>
    `recipients?search=${search.value}&pageNumber=${page.value}&pageSize=10`,
  {
    baseURL: config.public.API_SMARTSUITE_BASEURL,
    transform: ({ total, data }) => ({
      total,
      data: data.map((x: RecipientData) => ({
        id: x.id,
        name: x.name,
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

const toggleChecked = () => {
  form.recipients = [];

  mainChecked.value = mainCheck.value.length > 0;
  if (mainChecked.value) {
    data.value.data.forEach((value: RecipientData) => {
      form.recipients.push(value);
    });
  }
};
</script>

<template>
  <div>
    <div class="bg-white small-shadow">
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
          :options="
                  data.data.map((recipientItem: RecipientData) => {
                    return {
                      value: recipientItem,
                      label: `${recipientItem.name}`,
                    };
                  })
                "
          outer-class="recipient-list"
          input-class="form-check-input mr-2"
          @input="$emit('setRecipients', form.recipients)"
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
