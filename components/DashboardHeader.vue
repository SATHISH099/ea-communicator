<script setup>
const isOpen = ref(false);
</script>

<template>
  <div class="bg-[#F5F5F5] h-[90px] w-full flex justify-end items-center">
    <img src="/Component.png" class="mr-8" />
    <img src="/notification.png" class="mr-8" />
    <div class="dropdown">
      <img
        src="/avatar.png"
        class="abc h-10 mr-4 cursor-pointer"
        @click="isOpen = !isOpen"
      />
      <ul v-show="isOpen" class="dropdown-menu right-15 top-20">
        <li class="p-2">View Profile</li>
        <li class="p-2">Logout</li>
      </ul>
    </div>
    <p class="mr-10">Admin</p>
  </div>
</template>

<style scoped>
.abc {
  border: 3px solid #b42424;
  border-radius: 20px;
}
</style>
