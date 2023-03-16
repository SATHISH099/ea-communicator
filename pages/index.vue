<script lang="ts" setup></script>

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
          :to="{ name: 'email-messages-alert-add' }"
          class="btn btn-primary"
          >Send a Message</NuxtLink
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
</style>
