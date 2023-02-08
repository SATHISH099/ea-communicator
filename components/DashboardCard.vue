<script lang="ts">
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="card">
    <div class="card-header flex justify-between">
      <h5 class="card-title">{{ title }}</h5>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-shadow: 0px 2px 30px rgba(45, 45, 46, 0.06);
  background: #ffffff;
  border-radius: 4px;

  .card-header {
    padding: 20px;

    .card-title {
      color: #555555;
    }
  }
}
</style>
