<template>
  <div>
    <div class="mb-12">
      <h2 class="mb-4 text-stone">Dashboard</h2>
      <p class="text-[#A3A3A3]">
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
        <img src="~/assets/images/Messages.png" />
      </div>
      <div class="update-card flex items-center gap-15 p-[20px]">
        <div>
          <h1 class="text-primary mb-2">150</h1>
          <p class="font-medium text-carbon">Emails</p>
        </div>
        <img src="~/assets/images/Recipients-and-Groups.png" />
      </div>
      <div class="update-card flex items-center gap-15 p-[20px]">
        <div>
          <h1 class="text-primary mb-2">230</h1>
          <p class="font-medium text-carbon">Alert</p>
        </div>
        <img src="~/assets/images/Alerts.png" />
      </div>
      <div class="update-card flex items-center gap-15 p-[20px]">
        <div>
          <h1 class="text-primary mb-2">2367</h1>
          <p class="font-medium text-carbon">Library</p>
        </div>
        <img src="~/assets/images/Library.png" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-8">
      <div class="grid gap-8">
        <Card title="Messages">
          <div class="flex items-center gap-10 pb-5">
            <img src="~/assets/images/Pie-Chart.png" alt="" />
            <div>
              <div class="mb-8">
                <div class="flex items-center mb-2">
                  <h4 class="text-carbon mr-2">150</h4>
                  <span class="text-[20px] font-normal text-stone">(48%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <img src="~/assets/images/status-bullet.png" alt="" />
                  <span class="text-silver">Sent Messages</span>
                </div>
              </div>
              <div class="mb-8">
                <div class="flex items-center mb-2">
                  <h4 class="text-carbon mr-2">150</h4>
                  <span class="text-[20px] font-normal text-stone">(48%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <img src="~/assets/images/status-bullet.png" alt="" />
                  <span class="text-silver">Sent Messages</span>
                </div>
              </div>
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-carbon mr-2">150</h4>
                  <span class="text-[20px] font-normal text-stone">(48%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <img src="~/assets/images/status-bullet.png" alt="" />
                  <span class="text-silver">Sent Messages</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card title="Recent Recipients & Groups" class="pb-8">
          <Table :headers="headers" :rows="rows" class="w-full" />
        </Card>
      </div>
      <Card title="Recent Emails" class="col-span-2">
        <Table :headers="headers" :rows="rows" class="w-full" />
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
const headers = ['ID', 'Name', 'Email'];
const rows = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' },
];
</script>

<style lang="scss"></style>
