<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
const emit = defineEmits(['setDate']);
const router = useRoute();

const date = ref(
  router.fullPath.includes('history') ? '' : [new Date(), new Date()],
);

watch(
  () => date.value,
  () => {
    if (date.value[0] && date.value[1]) {
      emit('setDate', date.value);
    } else {
      date.value = router.fullPath.includes('history')
        ? ''
        : [new Date(), new Date()];
    }
  },
);
</script>

<template>
  <div class="datepicker">
    <VueDatePicker
      v-model="date"
      format="MM/dd/yyyy"
      :max-date="new Date()"
      range
      multi-calendars
      placeholder="Filter By: Date"
    />
  </div>
</template>
