<script lang="ts" setup>
import type { AuthUser } from '~~/composables/useCurrentUser';

const isOpen = ref(false);
const isOpens = ref(false);
const user = ref<AuthUser>();

const { logout } = useLogout();
const adminUrl = useRuntimeConfig().public.SMARTSUITE_BASEURL;
const userStore = useCurrentUser();
watchEffect(() => {
  user.value = userStore.user;
});
</script>

<template>
  <div
    class="bg-[#F5F5F5] h-[90px] w-full flex justify-end items-center cursor-pointer"
  >
    <client-only>
      <img
        v-click-away="() => (isOpens = false)"
        src="/Component.png"
        class="mr-8"
        @click="isOpens = !isOpens"
      />
    </client-only>
    <div
      v-show="isOpens"
      class="dropdown-menu shadow-xl md:right-21 right-13 top-20 p-40 z-2 md:w-[13%] w-[70%]"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col items-center">
          <img class="w-10" src="/SituationalAwareness.png" />
          <p class="p-2 text-center text-xs">Situational Awareness</p>
        </div>
        <div class="flex flex-col items-center">
          <img class="w-10" src="/communicator.png" />
          <p class="p-2 text-center text-xs">Communicator</p>
        </div>
        <div class="flex flex-col items-center">
          <img class="w-10" src="/Reseliency-Manager.png" />
          <p class="p-2 text-center text-xs">Resiliency Manager</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <img class="w-10" src="/Learning-Management.png" />
          <p class="p-2 text-center text-xs">Learning Management</p>
        </div>
        <div class="flex flex-col items-center">
          <img class="w-10" src="/Information-Center.png" />
          <p class="p-2 text-center text-xs">Information Center</p>
        </div>
        <div class="flex flex-col items-center">
          <NuxtLink :href="adminUrl">
            <img class="w-10" src="/Admin-Panel.png" />
          </NuxtLink>
          <p class="p-2 text-center text-xs">
            <NuxtLink :href="adminUrl">Admin Panel</NuxtLink>
          </p>
        </div>
      </div>
    </div>
    <div class="dropdown">
      <client-only>
        <img
          v-click-away="() => (isOpen = false)"
          :src="user?.profilePath || '/avatar.png'"
          class="h-10 mr-4 cursor-pointer rounded-50"
          @click="isOpen = !isOpen"
        />
      </client-only>
      <div v-show="isOpen" class="dropdown-menus right-21 top-20">
        <li class="p-2">
          <NuxtLink :to="{ name: 'profile' }" class="text-white"
            >View Profile</NuxtLink
          >
        </li>
        <li class="p-2">
          <button
            class="bg-transparent outline-none border-none text-white cursor-pointer text-[14px]"
            @click="logout"
          >
            Logout
          </button>
        </li>
      </div>
    </div>
    <p class="mr-10 truncate max-w-[8ch]">{{ user?.name }}</p>
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
