<script lang="ts" setup>
const MenuItems = [
  { text: 'Dashboard', link: '/dashboard', icon: 'dashboard.png' },
  { text: 'Manage Users', link: '/', icon: 'people.png' },
  {
    text: 'Email / Messages',
    link: '/email-messages',
    icon: 'email.png',
    items: [
      { text: 'Predefined Messages', link: '/pre' },
      { text: 'Account', link: '/account' },
    ],
  },
  { text: 'Recipients and Groups', link: '/', icon: 'recipients-groups.png' },
];

const SidebarOpen = ref(true);
</script>

<template>
  <div>
    <div class="shadow-2xl relative sidebar" :class="{ open: SidebarOpen }">
      <div class="sidebar-toggle-btn" @click="SidebarOpen = !SidebarOpen">
        <img src="/back-icon.png" alt="" />
      </div>
      <div class="logo">
        <img
          alt="logo"
          :src="`/${
            SidebarOpen
              ? 'smartsuite-communicator-logo.png'
              : 'smartsuite-communicator-emblem.png'
          }`"
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
                  ><img alt="item-icon" :src="`/${item.icon}`" />
                  {{ SidebarOpen ? item.text : '' }}</NuxtLink
                >
                <!-- <ul v-if="item.items">
                  <li v-for="subitem in item.items" :key="subitem.link">
                    <NuxtLink class="text-silver no-underline" :to="subitem.link">{{ SidebarOpen? subitem.text : '' }}
                    </NuxtLink>
                  </li>
                </ul> -->
              </li>
            </ul>
          </nav>
        </div>
        <div class="mb-15">
          <NuxtLink to="/">
            <div class="flex items-center gap-3">
              <img src="/logout.png" alt="logout" /><span
                :class="`${SidebarOpen ? 'block text-silver' : 'hidden'}`"
                >Logout</span
              >
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sidebar {
  width: 90px;
  height: 100vh;
  background: #ffffff;
  z-index: 1;
  transition: 0.5s;
  padding: 30px;

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    align-items: center;

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

    .logo {
      width: 158px;
      display: flex;
      justify-content: flex-start;
    }

    .menu-items {
      align-items: flex-start;

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
