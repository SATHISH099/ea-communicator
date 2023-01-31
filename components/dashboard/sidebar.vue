<template>
  <div>
    <div class="sidebar-toggle-btn">
      <button @click="SidebarState.sidebarOpen = !SidebarState.sidebarOpen">
        Toggle Sidebar
      </button>
    </div>
    <div
      class="shadow-2xl"
      :class="{ sidebar: true, open: SidebarState.sidebarOpen }"
    >
      <div class="flex justify-center">
        <img
          class="h-20 mt-4"
          alt="logo"
          :src="
            '_nuxt/assets/images/' +
            (SidebarState.sidebarOpen
              ? 'SmartSuiteLogo.png'
              : 'SmartSuite-Final-Logo.png')
          "
        />
      </div>
      <div class="flex flex-col">
        <div class="mt-8">
          <nav>
            <ul>
              <li v-for="item in items" :key="item.link">
                <NuxtLink
                  class="text-silver-chalice no-underline"
                  :to="item.link"
                  ><img :src="'_nuxt/assets/images/' + item.icon" />
                  {{ SidebarState.sidebarOpen ? item.text : "" }}</NuxtLink
                >
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <ul>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = [
  { text: "Dashboard", link: "/", icon: "Dashboard.png" },
  { text: "Manage Users", link: "/", icon: "people.png" },
  { text: "Email / Messages", link: "/", icon: "email.png" },
  { text: "Recipients and Groups", link: "/", icon: "Recipients-Groups.png" },
];

const SidebarState = reactive({
  sidebarOpen: true,
});
</script>

<style lang="scss">
.sidebar-toggle-btn {
  position: absolute;
  left: 300px;
  top: 28px;
}
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 90px;
  height: 100vh;
  background: #ffffff;
  z-index: 1;
  transition: 0.3s;
  ul {
    li {
      color: #a3a3a3 !important;
      padding: 20px 2px 20px 40px;
      border-radius: 6px;
      cursor: pointer;
    }
  }

  &.open {
    width: 317px;
  }
}
</style>
