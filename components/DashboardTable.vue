<script setup>
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  isDropdown: {
    default: true,
    required: false,
  },
  isTemplateDefine: {
    default: false,
    required: false,
  },
  type: {
    required: false,
  },
  dropDownOption: {
    default: { isView: true, isEdit: true, isDelete: true },
    required: false,
  },
  use: {
    required: false,
  },
  showBulkDelete: {
    type: Boolean,
    default: false,
    required: false,
  },
  actions: {
    type: Object,
    default: {},
  },
  isViewable: {
    type: Boolean,
    default: false,
  },
  onViewClick: {
    type: Function,
    default: () => {},
  },
});
const emit = defineEmits(['onDeleteRecord', 'sortRecord', 'bulkDelete']);

const headers = ref(props.headers);
const isDropdown = ref(props.isDropdown);
const mainChecked = ref(false);
const showBulk = ref(false);
const bulkChecked = ref({});

const onDeleteRecord = (id) => {
  emit('onDeleteRecord', id);
};

onMounted(() => {
  if (props.showBulkDelete && props.rows.length > 0) {
    for (const row of props.rows) {
      bulkChecked.value[row.id.toString()] = false;
    }
  }
});

const submitHandler = () => {
  showBulk.value = false;
  emit(
    'bulkDelete',
    Object.keys(bulkChecked.value).filter((key) => bulkChecked.value[key]),
  );

  bulkChecked.value = [];
};

const deleteShow = () => {
  showBulk.value = true;
};

const hideModal = () => {
  showBulk.value = false;
};

const toggleChecked = () => {
  for (const row of props.rows) {
    bulkChecked.value[row.id.toString()] = mainChecked.value;
  }
};
</script>

<template>
  <div class="admin-table">
    <DeleteRecord
      v-if="showBulkDelete && props.rows.length > 0"
      :entity="`bulk ${props.type}`"
      :show="showBulk"
      @onDeleteRecord="submitHandler"
      @hideModal="hideModal"
    ></DeleteRecord>

    <FormKit
      id="bulkDelete"
      v-slot="{ value }"
      type="form"
      :actions="false"
      @submit="deleteShow"
    >
      <table class="relative">
        <thead>
          <tr>
            <th
              v-if="props.showBulkDelete && props.rows.length > 0"
              class="px-[30px] py-[18px] position-relative"
            >
              <FormKit
                v-model="mainChecked"
                type="checkbox"
                input-class="form-check-input"
                @input="toggleChecked"
              />
              <div
                v-if="Object.values(bulkChecked).filter((v) => v).length > 0"
                class="flex position-absolute -top-1 left-15 items-center mt-5 md:w-auto w-full"
              >
                <FormKit
                  input-class="bg-transparent outline-none cursor-pointer border-none"
                  type="submit"
                  outer-class="flex items-center justify-end w-full mr-8"
                >
                  <img
                    class="w-[1.25rem] h-[1.25rem]"
                    alt=""
                    src="/bulk-delete.png"
                  />
                </FormKit>
              </div>
            </th>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="md:px-[30px] py-[18px] px-[24px]"
            >
              <div flex items-center gap-2>
                {{ header.value ?? header }}
                <img
                  v-if="header.isSort"
                  class="pl-2 cursor-pointer"
                  src="/arrow-and-direction.png"
                  alt=""
                  @click="$emit('sortRecord', header?.key)"
                />

                <img
                  v-if="header.image"
                  class="pl-2"
                  :src="header.image"
                  alt=""
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="props.rows.length === 0">
            <tr>
              <td
                class="text-center text-[14px] px-[30px] py-[18px]"
                :colspan="headers.length"
              >
                No data found.
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="row in props.rows" :key="row.id">
              <td v-if="props.showBulkDelete" class="px-[30px] py-[18px]">
                <FormKit
                  v-model="bulkChecked[row.id.toString()]"
                  type="checkbox"
                  input-class="form-check-input"
                />
              </td>

              <template v-for="(cell, index) in row">
                <td
                  v-if="headers.includes('ID') || index !== 'id'"
                  :key="index"
                  class="text-left text-[14px] px-[30px] py-[18px]"
                >
                  <div flex items-center>
                    <img
                      v-if="cell && cell.image"
                      class="pr-4"
                      :src="cell.image"
                    />
                    <p v-else>
                      {{ cell?.value ?? cell }}
                    </p>
                  </div>
                </td>
              </template>
              <td v-if="isViewable">
                <a
                  class="cursor-pointer flex justify-end text-sm hover:underline"
                  @click="onViewClick(row)"
                  >View</a
                >
              </td>
              <td class="text-[14px] px-[30px] py-[18px]">
                <DropdownTable
                  v-if="isDropdown ?? true"
                  :detail-id="row.id"
                  :type="props.type"
                  :actions="props.actions"
                  :drop-down-option="dropDownOption"
                  @onDeleteRecord="onDeleteRecord"
                ></DropdownTable>
                <button
                  v-if="isTemplateDefine ?? false"
                  class="text-primary hover:underline border-none bg-transparent cursor-pointer"
                  type="button"
                  @click="props.use(row)"
                >
                  Use
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </FormKit>
  </div>
</template>

<style lang="scss" scoped>
.admin-table {
  color: #2d2d2e;
  @media screen and (max-width: 1366px) {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        th {
          font-size: 16px;
          font-weight: 400;
          text-align: left;
        }
      }
    }

    tbody {
      tr {
        &:nth-child(odd) {
          background: #f7f7f7;
        }
      }
    }
  }
}
</style>
