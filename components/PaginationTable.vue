<script lang="ts" setup>
const props = defineProps(['totalRecords', 'currentPage', 'paginate']);
console.log(props.totalRecords);
</script>

<template>
  <div>
    <div class="mt-8">
      <button class="btn-pagination">
        <img src="/left-arrow.png" />
      </button>
      <button
        v-for="index in Math.ceil(parseInt(props.totalRecords) / 10)"
        :key="index"
        :class="`${currentPage === index ? 'active' : ''}  btn-pagination`"
        @click="props.paginate(index)"
      >
        {{ index }}
      </button>
      <button class="btn-pagination">
        <img src="/right-arrow.png" />
      </button>
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
