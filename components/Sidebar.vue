<template>
  <div>
    <div
      class="shadow-2xl relative"
      :class="{ sidebar: true, open: SidebarOpen }"
    >
      <div class="sidebar-toggle-btn" @click="SidebarOpen = !SidebarOpen">
        <img src="~/assets/images/back-icon.png" alt="" />
      </div>
      <div class="logo">
        <img
          alt="logo"
          :src="
            '_nuxt/assets/images/' +
            (SidebarOpen ? 'SmartSuiteLogo.png' : 'SmartSuite-Final-Logo.png')
          "
        />
      </div>
      <div class="menu-items">
        <div class="mt-8">
          <nav>
            <ul>
              <li v-for="item in MenuItems" :key="item.link">
                <NuxtLink
                  class="text-silver no-underline flex items-center gap-3"
                  :to="item.link"
                  ><img
                    alt="item-icon"
                    :src="'_nuxt/assets/images/' + item.icon"
                  />
                  {{ SidebarOpen ? item.text : '' }}</NuxtLink
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
const MenuItems = [
  { text: 'Dashboard', link: '/', icon: 'Dashboard.png' },
  { text: 'Manage Users', link: '/', icon: 'people.png' },
  { text: 'Email / Messages', link: '/', icon: 'email.png' },
  { text: 'Recipients and Groups', link: '/', icon: 'Recipients-Groups.png' },
];

const SidebarOpen = ref(true);
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 90px;
  height: 100vh;
  background: #ffffff;
  z-index: 1;
  transition: 0.5s;
  padding: 20px;

  .sidebar-toggle-btn {
    position: absolute;
    right: -15px;
    top: 33px;
    box-shadow: 0px 3.20559px 32.0559px rgba(0, 0, 0, 0.08);
    background: #ffffff;
    width: 28px;
    height: 28px;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .logo {
    display: flex;
    justify-content: center;
  }

  .menu-items {
    ul {
      list-style-type: none;

      li {
        color: #a3a3a3;
        padding: 20px 0;
        cursor: pointer;

        a {
          justify-content: center;
        }
      }
    }
  }

  &.open {
    width: 317px;
    padding: 30px;

    .logo {
      width: 158px;
      display: flex;
      justify-content: flex-start;
    }

    .menu-items {
      ul {
        li {
          a {
            justify-content: flex-start;
          }
        }
      }
    }
  }
}
</style>
