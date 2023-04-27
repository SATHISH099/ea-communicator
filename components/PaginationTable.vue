<script lang="ts" setup>
const props = defineProps([
  'totalRecords',
  'currentPage',
  'paginate',
  'pageSize',
  'entity',
  'length',
]);

const emit = defineEmits(['setPerPage']);
const perPage = ref<number>(10);
const totalPageCount = computed(() =>
  Math.ceil(Number(props.totalRecords) / Number(props.pageSize || perPage)),
);

const totalPages = ref(
  getPaginationNumbers(
    props.currentPage,
    totalPageCount.value,
    props.length === 'small' ? 2 : 5,
  ),
);

watch(
  () => props.currentPage,
  () => {
    totalPages.value = getPaginationNumbers(
      props.currentPage,
      totalPageCount.value,
      props.length === 'small' ? 2 : 5,
    );
  },
);

watch(
  () => props.pageSize,
  () => {
    totalPages.value = getPaginationNumbers(
      props.currentPage,
      totalPageCount.value,
      props.length === 'small' ? 2 : 5,
    );
  },
);

watch(
  () => props.totalRecords,
  () => {
    totalPages.value = getPaginationNumbers(
      props.currentPage,
      totalPageCount.value,
      props.length === 'small' ? 2 : 5,
    );
  },
);

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
          v-for="(page, index) in totalPages"
          :key="index"
          type="button"
          :class="`${currentPage === page ? 'active' : ''}  btn-pagination`"
          @click="props.paginate(page)"
        >
          {{ page }}
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
