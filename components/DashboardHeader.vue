<script lang="ts" setup>
import type { AuthUser } from '~~/composables/useCurrentUser';

const isOpen = ref(false);
const isOpens = ref(false);
const user = ref<AuthUser>();

const { loading, logout } = useLogout();
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
          <img class="w-10" src="/communicator.png" />
          <a class="p-2 text-center text-xs">Communicator</a>
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
        <div
          flex
          justify-center
          items-center
          @click="isOpen = !isOpen"
          v-click-away="() => (isOpen = false)"
        >
          <img
            :src="user?.profilePath || '/blank-profile.png'"
            class="h-10 w-10 mr-4 cursor-pointer rounded-50"
            alt=""
          />
          <p class="mr-10 max-w-[16ch]">
            {{ textLimit(user?.name ?? '', 10) }}
          </p>
        </div>
      </client-only>
      <div v-show="isOpen" class="dropdown-menus right-15 top-20">
        <li class="p-2">
          <NuxtLink :to="{ name: 'profile' }" class="text-white text-[14px]"
            >View Profile</NuxtLink
          >
        </li>
        <li class="p-2">
          <button
            class="bg-transparent outline-none border-none text-white cursor-pointer text-[14px]"
            :disabled="loading"
            @click="logout"
          >
            Logout
          </button>
        </li>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
