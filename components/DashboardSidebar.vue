<script lang="ts" setup>
const MenuItems = [
  {
    text: 'Dashboard',
    link: '/',
    icon: 'dashboard.png',
    activeIcon: 'dashboard-active.png',
  },
  {
    text: 'Email / Messages',
    link: '/email-messages',
    icon: 'email.png',
    activeIcon: 'email-active.png',
    items: [
      {
        text: 'Predefined Templates',
        link: '/email-messages/predefined-templates',
      },
      {
        text: 'Scheduled Messages',
        link: '',
      },
      { text: 'Messages', link: '/email-messages/alert' },
      { text: 'Email', link: '/email-messages/email' },
      { text: 'SMS', link: '/email-messages/sms' },
    ],
  },
  {
    text: 'Recipients and Groups',
    link: '/recipients-and-groups',
    icon: 'recipients-groups.png',
    activeIcon: 'recipients-groups-active.png',
    items: [
      {
        text: 'Groups',
        link: '/recipients-and-groups/groups',
      },
      { text: 'Recipients', link: '/recipients-and-groups/recipients' },
    ],
  },
  {
    text: 'History',
    link: '/history',
    icon: 'history.png',
    activeIcon: 'history-active.png',
  },
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
                  :class="`${
                    $route.path === item.link ? 'text-primary' : 'text-silver'
                  } no-underline flex items-center gap-3`"
                  :to="item.link"
                  @click="
                    showDropdown === item.link
                      ? (showDropdown = '')
                      : (showDropdown = item.link)
                  "
                  ><img
                    alt="item-icon"
                    :src="`/${
                      $route.path === item.link ? item.activeIcon : item.icon
                    }`"
                  />
                  {{ SidebarOpen ? item.text : '' }}
                </NuxtLink>
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
                      :class="`${
                        $route.path === subitem.link
                          ? 'text-primary'
                          : 'text-silver'
                      }`"
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
  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
  }

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
