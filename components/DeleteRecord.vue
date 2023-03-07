<script setup>
const props = defineProps({
  entity: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    default: true,
    required: false,
  },

  deleteId: {
    default: true,
    required: false,
  },
});
defineEmits('onDeleteRecord', 'hideModal');
</script>

<template>
  <div>
    <div v-if="props.show">
      <CModal
        title="Confirmation"
        :message="`Do you want to delete ${props.entity} ?`"
        :item-id="deleteId"
        @confirm="$emit('onDeleteRecord', props.deleteId)"
        @close="$emit('hideModal')"
      />
    </div>
  </div>
</template>
