<script lang="ts" setup>
definePageMeta({
  middleware: 'permission',
});

const user = useCurrentUser();
</script>

<template>
  <div>
    <div class="mb-12">
      <div class="md:flex justify-between">
        <div>
          <h4 class="mb-2 text-stone">Dashboard</h4>
          <p class="text-silver mb-10 md:mb-0 flex items-center">
            Communicator /
            <span class="text-primary">&nbsp; Dashboard</span>
          </p>
        </div>
        <NuxtLink
          v-if="!user.hasRole('team-member')"
          :to="{ name: 'email-messages-alert-add' }"
          class="btn btn-primary"
        >
          Send an Alert</NuxtLink
        >
      </div>
    </div>
    <DashboardAnalytics></DashboardAnalytics>
    <div class="lg:flex gap-6">
      <DashboardChart></DashboardChart>
      <DashboardTabs></DashboardTabs>
    </div>
  </div>
</template>

<style lang="scss">
.tab {
  background-color: #f5f5f5;
  color: #a3a3a3;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
}

.tab.active {
  background-color: #b42424;
  color: white;
}

// DashBoard Styling
@media only screen and (max-width: 1450px) and (min-width: 1200px) {
  .dashboard-count {
    display: flex;
    flex-wrap: wrap;

    div {
      width: 48%;
    }
  }
}

@media only screen and (max-width: 1450px) {
  .recent-panel {
    .recent-sent-message {
      display: block;
    }

    .recent-sms {
      position: relative;
      top: 0%;
    }
  }
}
</style>
