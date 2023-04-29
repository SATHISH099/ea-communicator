<script setup>
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: 'phoneNumber',
  },
  label: {
    type: String,
    default: '',
  },
  validationLabel: {
    type: String,
    default: 'Phone number',
  },
  placeholder: {
    type: String,
    default: 'Phone number',
  },
  floatingLabel: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['input']);

const node = ref();
watch(
  () => props.value,
  () => {
    if (props.value) {
      node.value.input(props.value);
    }
  },
);
</script>

<template>
  <FormKit
    :name="props.name"
    :value="props.value"
    :validation-label="props.validationLabel"
    :floating-label="props.floatingLabel"
    type="text"
    :label="label"
    :placeholder="floatingLabel ? '' : props.placeholder"
    validation="required|length:9,15"
    input-class="form-control"
    :outer-class="props.floatingLabel ? 'floating-label' : 'w-full mb-5'"
    oninput="const val=this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').slice(0, 14); this.value = `${val.length>0?'+':''}${val}`;"
    @node="(n) => (node = n)"
    @input="(val) => $emit('input', val)"
  />
</template>
