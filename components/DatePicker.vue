<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
const date = ref(new Date());
</script>

<template>
  <div class="datepicker">
    <VueDatePicker v-model="date" range multi-calendars />
  </div>
</template>
