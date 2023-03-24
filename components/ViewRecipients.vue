<script lang="ts" setup>
const props = defineProps(['recipients']);
defineEmits(['setRecipients']);
const search = ref('');
const searchField = ref('');
const mainCheck = ref([]);
const mainChecked = ref(false);
const page = ref(1);
const config = useRuntimeConfig();

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
      data: data.map(({ id, name }: RecipientData) => ({
        id,
        name,
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
    <div bg-white small-shadow>
      <div px-6 py-6>
        <h5 text-stone mb-5>Recipient's List</h5>
        <FormKit
          v-model="searchField"
          prefix-icon="search"
          type="search"
          placeholder="Search"
          input-class="form-control pl-[3.5rem]"
          outer-class="search-field"
          prefix-icon-class="search-icon"
          @change="searchKeyword"
        />
      </div>
      <div class="pb-10">
        <div>
          <FormKit
            v-model="mainCheck"
            type="checkbox"
            input-class="form-check-input flex"
            :options="[{ value: true, label: 'Recipients' }]"
            @input="toggleChecked"
            outer-class="recipient-checkbox"
          />
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
            :totalRecords="data.total"
            :currentPage="page"
            v-bind:paginate="paginate"
          ></PaginationTable>
        </div>
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
