<script setup>
const isOpen = ref(false);
const isOpens = ref(false);
</script>

<template>
  <div
    class="bg-[#F5F5F5] h-[90px] w-full flex justify-end items-center cursor-pointer"
  >
    <img src="/Component.png" @click="isOpens = !isOpens" class="mr-8" />
    <div
      v-show="isOpens"
      class="dropdown-menu shadow-xl right-30 top-20 p-40 z-2"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col items-center">
          <img class="w-10" src="/SituationalAwareness.png" />
          <p class="p-2 text-center">Situational Awareness</p>
        </div>
        <div class="flex flex-col items-center">
          <img class="w-10" src="/SituationalAwareness.png" />
          <p class="p-2 text-center">Communicator</p>
        </div>
        <div class="flex flex-col items-center">
          <img class="w-10" src="/SituationalAwareness.png" />
          <p class="p-2 text-center">Resiliency Manager</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <img class="w-10" src="/SituationalAwareness.png" />
          <p class="p-2 text-center">Learning Management</p>
        </div>
        <div class="flex flex-col items-center">
          <img class="w-10" src="/SituationalAwareness.png" />
          <p class="p-2 text-center">Information Center</p>
        </div>
        <div class="flex flex-col items-center">
          <img class="w-10" src="/SituationalAwareness.png" />
          <p class="p-2 text-center">Admin Panel</p>
        </div>
      </div>
    </div>
    <img src="/notification.png" class="mr-8" />
    <div class="dropdown">
      <img
        src="/avatar.png"
        class="abc h-10 mr-4 cursor-pointer"
        @click="isOpen = !isOpen"
      />
      <div v-show="isOpen" class="dropdown-menus right-15 top-20">
        <li class="p-2">
          <NuxtLink :to="{ name: 'email-messages-profile' }" class="text-white"
            >View Profile</NuxtLink
          >
        </li>
        <li class="p-2">Logout</li>
      </div>
    </div>
    <p class="mr-10">Admin</p>
  </div>
</template>

<style scoped>
.dropdown-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #a3a3a3;
  border: 1px solid white;
  border-radius: 6px;
  padding: 4px 8px 4px 8px;
  position: absolute;
  cursor: pointer;
  list-style: none;
  width: 13%;
  padding: 20px 10px 20px 10px;
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
  border-bottom: 10px solid white;
  transform: translate(-50%, -50%);
}
.dropdown-menus {
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
.dropdown-menus:after {
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
