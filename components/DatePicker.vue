<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
const props = defineProps<{ initEmpty?: boolean }>();
const emit = defineEmits(['setDate', 'onError']);

const date = ref(props.initEmpty ? '' : [new Date(), new Date()]);

watch(
  () => date.value,
  () => {
    if (date.value[0] && date.value[1]) {
      emit('setDate', date.value);
    } else if (!props.initEmpty) {
      emit('onError', 'single-date');
      date.value = [new Date(), new Date()];
    } else {
      date.value = '';
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
