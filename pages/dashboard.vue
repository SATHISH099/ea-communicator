<script lang="ts" setup>
const RecentEmailHeaders = ['ID', 'Name', 'Email'];
const RecentEmailRows = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' },
];
</script>

<template>
  <div>
    <div class="mb-12">
      <h4 class="mb-4 text-carbon">Dashboard</h4>
      <p class="text-silver">
        Smart Suit / Communicator /
        <span class="text-primary">Dashboard</span>
      </p>
    </div>
    <div class="flex items-center gap-5 mb-8">
      <div class="update-card flex items-center gap-15">
        <div>
          <h1 class="text-primary mb-2">25</h1>
          <p class="font-medium text-carbon">Short Messages</p>
        </div>
        <img alt="messages" src="/messages.png" />
      </div>
      <div class="update-card flex items-center gap-15 p-[20px]">
        <div>
          <h1 class="text-primary mb-2">150</h1>
          <p class="font-medium text-carbon">Emails</p>
        </div>
        <img alt="recipient and groups" src="/recipients-and-groups.png" />
      </div>
      <div class="update-card flex items-center gap-15 p-[20px]">
        <div>
          <h1 class="text-primary mb-2">230</h1>
          <p class="font-medium text-carbon">Alert</p>
        </div>
        <img alt="alerts" src="/alerts.png" />
      </div>
      <div class="update-card flex items-center gap-15 p-[20px]">
        <div>
          <h1 class="text-primary mb-2">2367</h1>
          <p class="font-medium text-carbon">Library</p>
        </div>
        <img alt="library" src="/library.png" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-8">
      <div class="grid gap-8">
        <DashboardCard title="Messages">
          <div class="flex items-center gap-10 pb-5">
            <img src="/pie-chart.png" alt="" />
            <div>
              <div class="mb-8">
                <div class="flex items-center mb-2">
                  <h4 class="text-carbon mr-2">150</h4>
                  <span class="text-[20px] font-normal text-stone">(48%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <img src="/status-bullet.png" alt="" />
                  <span class="text-silver">Sent Messages</span>
                </div>
              </div>
              <div class="mb-8">
                <div class="flex items-center mb-2">
                  <h4 class="text-carbon mr-2">150</h4>
                  <span class="text-[20px] font-normal text-stone">(48%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <img src="/status-bullet.png" alt="" />
                  <span class="text-silver">Sent Messages</span>
                </div>
              </div>
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-carbon mr-2">150</h4>
                  <span class="text-[20px] font-normal text-stone">(48%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <img src="/status-bullet.png" alt="" />
                  <span class="text-silver">Sent Messages</span>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard title="Recent Recipients & Groups" class="pb-8">
          <DashboardTable
            :headers="RecentEmailHeaders"
            :rows="RecentEmailRows"
            class="w-full"
          />
        </DashboardCard>
      </div>
      <DashboardCard title="Recent Emails" class="col-span-2">
        <DashboardTable
          :headers="RecentEmailHeaders"
          :rows="RecentEmailRows"
          class="w-full"
        />
      </DashboardCard>
    </div>
  </div>
</template>

<style lang="scss"></style>
