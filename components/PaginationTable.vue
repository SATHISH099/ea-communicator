<script lang="ts" setup>
const props = defineProps([
  'totalRecords',
  'currentPage',
  'paginate',
  'pageSize',
  'entity',
]);
const emit = defineEmits(['setPerPage']);
const perPage = ref<number>(10);

const setPerPage = () => {
  emit('setPerPage', Number(perPage.value));
};
</script>

<template>
  <div>
    <div class="md:flex justify-between">
      <div v-if="props.totalRecords > 0" class="mt-8">
        <button
          class="btn-pagination"
          type="button"
          :disabled="currentPage === 1"
          @click="props.paginate(currentPage - 1)"
        >
          <img src="/left-arrow.png" />
        </button>
        <button
          v-for="index in Math.ceil(
            Number(props.totalRecords) / Number(props.pageSize || perPage),
          )"
          :key="index"
          type="button"
          :class="`${currentPage === index ? 'active' : ''}  btn-pagination`"
          @click="props.paginate(index)"
        >
          {{ index }}
        </button>
        <button
          class="btn-pagination"
          type="button"
          :disabled="
            currentPage ===
            Math.ceil(
              Number(props.totalRecords) / Number(props.pageSize || perPage),
            )
          "
          @click="props.paginate(currentPage + 1)"
        >
          <img src="/right-arrow.png" />
        </button>
      </div>

      <div v-if="props.totalRecords > 0" class="mt-8 flex gap-4 mr-4">
        <div flex items-center gap-3>
          <span class="text-stone">Showing</span>
          <FormKit
            v-model="perPage"
            type="select"
            :options="[10, 20, 50, 100]"
            @input="setPerPage"
            input-class="form-control show-entries"
          />
          <span class="text-stone whitespace-nowrap"
            >{{ props.entity }} out of {{ totalRecords }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.btn-pagination {
  font-size: 16px;
  border: 1px solid white;
  padding: 6px 10px;
  border-radius: 4px;
  margin-right: 5px;
  background-color: #fff;
  cursor: pointer;
}
.btn-pagination:hover,
.btn-pagination.active {
  font-size: 16px;
  border: 1px solid #b42424;
  padding: 6px 10px;
  margin-right: 5px;
  border-radius: 4px;
  background-color: #b42424;
  color: white;
}
</style>
