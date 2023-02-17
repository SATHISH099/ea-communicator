<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<template>
  <div
    class="bg-[#F5F5F5] h-[90px] w-full flex md:justify-end justify-start pl-8 md:pl-0 items-center"
  >
    <img src="/Component.png" class="mr-8" />
    <img src="/notification.png" class="mr-8" />
    <div class="dropdown">
      <img
        src="/avatar.png"
        class="h-10 border-4 border-indigo-600 mr-2 cursor-pointer"
        @click="isOpen = !isOpen"
      />
      <ul v-show="isOpen" class="dropdown-menu right-12">
        <li class="p-2">View Profile</li>
        <li class="p-2">Logout</li>
      </ul>
    </div>
    <p class="mr-10">Admin</p>
  </div>
</template>

<style scoped></style>
