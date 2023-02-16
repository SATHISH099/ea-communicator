<script lang="ts" setup>
const MenuItems = [
  {
    text: 'Dashboard',
    link: '/dashboard',
    icon: 'dashboard.png',
    activeIcon: 'dashboard-active.png',
  },
  {
    text: 'Manage Users',
    link: '',
    icon: 'people.png',
    activeIcon: 'people-active.png',
  },
  {
    text: 'Email / Messages',
    link: '/email-messages',
    icon: 'email.png',
    activeIcon: 'email-active.png',
    items: [
      {
        text: 'Predefined Messages',
        link: '/email-messages/predefined-messages',
      },
      { text: 'Alert', link: '/email-messages/alert' },
      { text: 'Email', link: '/email-messages/email' },
    ],
  },
  {
    text: 'Recipients and Groups',
    link: '',
    icon: 'recipients-groups.png',
    activeIcon: 'recipients-groups-active.png',
  },
  { text: 'History', link: '/history', icon: 'History.png' },
];

const showDropdown = ref('');
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
              <li
                v-for="item in MenuItems"
                :key="item.link"
                class="py-[20px] px-0 text-silver cursor-pointer relative"
              >
                <NuxtLink
                  :to="item.link"
                  :class="`${
                    $route.path === item.link ? 'text-primary' : 'text-silver'
                  } no-underline flex items-center gap-3`"
                  ><img
                    alt="item-icon"
                    :src="`/${
                      $route.path === item.link ? item.activeIcon : item.icon
                    }`"
                  />
                  {{ SidebarOpen ? item.text : '' }}</NuxtLink
                >
                <template v-if="item.items && SidebarOpen">
                  <img
                    :src="
                      showDropdown === item.link
                        ? '/arrow-up.png'
                        : '/arrow-down.png'
                    "
                    alt="arrow-down"
                    class="absolute top-[1.55rem] -right-[2rem]"
                    @click="
                      showDropdown === item.link
                        ? (showDropdown = '')
                        : (showDropdown = item.link)
                    "
                  />
                </template>
                <ul
                  v-if="item.items && showDropdown === item.link"
                  class="transition"
                >
                  <li
                    v-for="subitem in item.items"
                    :key="subitem.link"
                    class="pt-[2em] pl-[2em]"
                  >
                    <NuxtLink
                      class="text-silver no-underline"
                      :to="subitem.link"
                      >{{ SidebarOpen ? subitem.text : '' }}
                    </NuxtLink>
                  </li>
                </ul>
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
  width: 5.625em;
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
      a {
        justify-content: center;
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
