<script lang="ts" setup>
const showDropdown = ref('');
const SidebarOpen = ref(false);
const isDesktop = ref(false);

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
      // TODO: uncomment when needed
      // {
      //   text: 'Scheduled Messages',
      //   link: '/email-messages/scheduled-message',
      // },
      { text: 'Messages', link: '/email-messages/alert' },
      { text: 'Email', link: '/email-messages/email' },
      { text: 'SMS', link: '/email-messages/sms' },
      { text: 'Library', link: '/email-messages/library' },
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

onMounted(() => {
  if (process.client) {
    isDesktop.value = window.matchMedia('(min-width: 768px)').matches;
  }
});

watchEffect(() => {
  if (isDesktop.value) {
    SidebarOpen.value = true;
  } else {
    SidebarOpen.value = false;
  }
});
</script>

<template>
  <div>
    <button
      class="absolute top-[2.5em] left-[2em] border-none bg-transparent outline-none cursor-pointer md:hidden block"
      @click="SidebarOpen = !SidebarOpen"
    >
      <img alt="" class="w-[1.5rem]" src="/hamburger-icon.png" />
    </button>
    <div :class="`shadow-2xl relative sidebar ${SidebarOpen ? 'open' : ''}`">
      <div
        class="absolute -right-[15px] top-[33px] shadow-[0_3.20559px_32.0559px_rgba(0,0,0,0.08)] bg-white w-[28px] h-[28px] p-[10px] rounded-[50%] md:flex hidden items-center cursor-pointer"
        @click="SidebarOpen = !SidebarOpen"
      >
        <img src="/back-icon.png" alt="" />
      </div>
      <div
        flex
        :class="`${
          SidebarOpen ? 'justify-start' : 'justify-center'
        }  logo pb-5`"
      >
        <img
          alt="logo"
          :src="`/${
            SidebarOpen ? 'SmartSuitLogo.png' : 'CommunicatorLogo.png'
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
                class="py-5 px-0 text-silver cursor-pointer relative"
              >
                <NuxtLink
                  :class="`${
                    $route.path.startsWith(item.link)
                      ? 'text-primary'
                      : 'text-silver'
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
                      $route.path.startsWith(item.link)
                        ? item.activeIcon
                        : item.icon
                    }`"
                  />
                  {{ SidebarOpen ? item.text : '' }}
                </NuxtLink>
                <ul
                  v-if="item.items && showDropdown === item.link && SidebarOpen"
                  class="transition mt-6"
                >
                  <li v-for="subitem in item.items" :key="subitem.link">
                    <NuxtLink
                      :class="`${
                        subitem.link && $route.path.startsWith(subitem.link)
                          ? 'text-primary bg-floral'
                          : 'text-silver'
                      } mt-2 px-10 py-3 block rounded-[4px] w-full`"
                      :to="subitem.link"
                      >{{ SidebarOpen ? subitem.text : '' }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div class="mb-[5rem]">
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
    display: none;
  }

  .logo {
    border-bottom: 1px solid #f5f5f5;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    padding-left: 0;
    ul {
      list-style-type: none;
      a {
        justify-content: center;
      }
    }
  }

  &.open {
    width: 317px;
    @media screen and (max-width: 768px) {
      position: absolute;
      top: 5.5rem;
      left: 0;
      display: block;
    }

    .menu-items {
      align-items: flex-start;
      padding-left: 10px;

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
