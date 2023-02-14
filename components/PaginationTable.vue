<script lang="ts" setup></script>

<template>
  <div>
    <div class="mt-8">
      <button class="btn-pagination">
        <img src="/left-arrow.png" />
      </button>
      <button class="btn-pagination">1</button>
      <button class="btn-pagination">2</button>
      <button class="btn-pagination">3</button>
      <button class="btn-pagination">4</button>
      <button class="btn-pagination">5</button>
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
.btn-pagination:hover {
  font-size: 16px;
  border: 1px solid #b42424;
  padding: 6px 10px;
  margin-right: 5px;
  border-radius: 4px;
  background-color: #b42424;
  color: white;
}
</style>
