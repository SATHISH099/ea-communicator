<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
const emit = defineEmits(['setDate']);

const date = ref([new Date(), new Date()]);
const handleDate = (dateStr: string) => {
  emit('setDate', dateStr);
};
</script>

<template>
  <div class="datepicker">
    <VueDatePicker
      v-model="date"
      type="date"
      :time="false"
      format="MM/dd/yyyy"
      :max-date="new Date()"
      range
      multi-calendars
      placeholder="Filter By: Date"
      @update:model-value="handleDate"
    />
  </div>
</template>
