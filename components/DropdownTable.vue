<script setup>
const isOpen = ref(false);
</script>

<template>
  <div class="dropdown relative text-right">
    <img class="cursor-pointer" src="/EditIcon.png" @click="isOpen = !isOpen" />
    <ul
      v-show="isOpen"
      class="dropdown-menu z-10 absolute top-[30px] -right-[30px] bg-stone px-[12px] py-[4px] rounded-[4px] cursor-pointer text-white list-style-none"
    >
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
  border: 1px solid white;
  border-radius: 6px;
  padding: 4px 8px 4px 8px;
  position: absolute;
  cursor: pointer;
  list-style: none;
}
.dropdown-menu:after {
  position: absolute;
  content: '';
  left: 50%;
  top: -4px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #555555;
  transform: translate(-50%, -50%);
}
</style>
