<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
const emit = defineEmits(['setDate']);

const date = ref(new Date());
const handleDate = (dateStr: string) => {
  emit('setDate', dateStr);
};
</script>

<template>
  <div class="datepicker">
    <VueDatePicker
      v-model="date"
      range
      multi-calendars
      @update:model-value="handleDate"
      placeholder="Filter By: Date"
    />
  </div>
</template>
