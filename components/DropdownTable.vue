<script>
export default {
  props: {
    buttonLabel: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<template>
  <div class="dropdown">
    <img class="cursor-pointer" src="/EditIcon.png" @click="isOpen = !isOpen" />
    <ul v-show="isOpen" class="dropdown-menu">
      <li class="p-2">View</li>
      <li class="p-2">Edit</li>
      <li class="p-2">Delete</li>
    </ul>
  </div>
</template>

<style>
.dropdown-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #555555;
  color: white;
  border-radius: 4px;
  padding: 4px 12px 4px 12px;
  position: absolute;
  cursor: pointer;
  list-style: none;
}
</style>
