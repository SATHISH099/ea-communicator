<script lang="ts" setup>
const props = defineProps(['recipients']);
defineEmits(['setRecipients']);
const search = ref('');
const searchField = ref('');
const page = ref(1);
const config = useRuntimeConfig();

interface RecipientData {
  id: number;
  firstName: string;
  lastName: string;
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
    baseURL: config.public.API_SMARTSUITE_BASE_URL,
    transform: ({ total, data }) => ({
      total,
      data: data.map(({ id, firstName, lastName }: RecipientData) => ({
        id,
        firstName,
        lastName,
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
    <div bg-white small-shadow>
      <div px-6 pt-6>
        <h5 text-stone mb-5>Recipient's List</h5>
        <FormKit
          v-model="searchField"
          prefix-icon="search"
          type="search"
          placeholder="Search"
          input-class="form-control pl-[3.5rem]"
          prefix-icon-class="search-icon"
          @change="searchKeyword"
        />
      </div>

      <div px-6>
        <div>
          <FormKit
            v-model="form.recipients"
            type="checkbox"
            :options="
                  data.data.map((recipientItem: RecipientData) => {
                    return {
                      value: recipientItem,
                      label: `${recipientItem.firstName} ${recipientItem.lastName}`,
                    };
                  })
                "
            outer-class="recipient-list"
            input-class="form-check-input mr-2"
            @input="$emit('setRecipients', form.recipients)"
          />
        </div>
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
</template>
