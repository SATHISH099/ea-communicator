<template>
  <div class="admin-table">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="cell in row" :key="cell">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TableComponent',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
  setup(props: any) {
    const headers = ref(props.headers);
    const rows = ref(props.rows);

    return {
      headers,
      rows,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-table {
  color: #2d2d2e;

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        th {
          padding: 18px 30px;
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
