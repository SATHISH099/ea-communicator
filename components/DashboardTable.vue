<script setup>
import { boolean } from 'zod';

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
    type: boolean,
    required: false,
  },
  isTemplateDefine: {
    type: boolean,
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
            class="md:px-[32px] py-[18px] px-[24px]"
            v-for="header in headers"
            :key="header"
          >
            {{ header.value ?? header }}
            <img v-if="header.image" class="pl-4" :src="header.image" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="cell in row" :key="cell">
            <div flex items-center>
              <img v-if="cell.image" class="pr-4" :src="cell.image" />
              {{ cell.value ?? cell }}
            </div>
          </td>
          <td>
            <DropdownTable v-if="isDropdown ?? true"></DropdownTable>
            <UsePredefined v-if="isTemplateDefine ?? false"></UsePredefined>
          </td>
        </tr>
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
          // padding: 18px 30px;
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

        td {
          padding: 18px 30px;
          font-size: 14px;
          text-align: left;
        }
      }
    }
  }
}
</style>
