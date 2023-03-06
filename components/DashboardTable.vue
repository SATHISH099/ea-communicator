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
});
const headers = ref(props.headers);
const rows = ref(props.rows);
const isDropdown = ref(props.isDropdown);
</script>

<template>
  <div class="admin-table overflow-auto scroll">
    <table class="relative">
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="md:px-[30px] py-[18px] px-[24px]"
          >
            {{ header.value ?? header }}
            <img v-if="header.image" class="pl-4" :src="header.image" />
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
            <td
              v-for="(cell, index) in row"
              :key="index"
              class="text-left text-[14px] px-[30px] py-[18px]"
            >
              <div flex items-center>
                <img v-if="cell && cell.image" class="pr-4" :src="cell.image" />
                {{ cell?.value ?? cell }}
              </div>
            </td>
            <td class="text-[14px] px-[30px] py-[18px]">
              <DropdownTable
                v-if="isDropdown ?? true"
                :detail-id="row.id"
                :type="props.type"
              ></DropdownTable>
              <button
                v-if="isTemplateDefine ?? false"
                @click="props.use(row)"
                class="text-primary hover:underline"
                type="button"
              >
                Use
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.admin-table {
  color: #2d2d2e;

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
