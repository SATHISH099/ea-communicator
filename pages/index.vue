<script lang="ts" setup>
const RecentEmailHeaders = ['Receiver', 'Email Subject', 'Email Messages'];
const RecentEmailRows = [
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    EmailSubject: 'John Doe',
    EmailMessages: 'johndoe@example.com',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    EmailSubject: 'John Doe',
    EmailMessages: 'johndoe@example.com',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    EmailSubject: 'John Doe',
    EmailMessages: 'johndoe@example.com',
  },
];

const activeTab = ref('alerts');
</script>

<template>
  <div>
    <div class="mb-12">
      <h4 class="mb-2 text-stone">Dashboard</h4>
      <div class="md:flex justify-between">
        <p class="text-silver mb-10 md:mb-0 flex items-center">
          Communicator /
          <span class="text-primary">&nbsp; Dashboard</span>
        </p>
        <NuxtLink
          to="email-messages/alert/add"
          class="btn btn-primary flex justify-center items-center"
          >Send a Message</NuxtLink
        >
      </div>
    </div>
    <div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-6 mb-8">
      <div class="update-card flex justify-between items-center gap-15">
        <div>
          <h1 class="text-primary mb-2 font-bold">25</h1>
          <p class="font-medium text-carbon">Sent SMS</p>
        </div>
        <img alt="messages" src="/messages.png" />
      </div>
      <div class="update-card flex justify-between items-center gap-15">
        <div>
          <h1 class="text-primary mb-2 font-bold">150</h1>
          <p class="font-medium text-carbon">Sent Emails</p>
        </div>
        <img alt="recipient and groups" src="/SentEmails.png" />
      </div>
      <div class="update-card flex justify-between items-center gap-15">
        <div>
          <h1 class="text-primary mb-2 font-bold">230</h1>
          <p class="font-medium text-carbon">Sent Messages</p>
        </div>
        <img alt="alerts" src="/alerts.png" />
      </div>
      <div class="update-card flex justify-between items-center gap-15">
        <div>
          <h1 class="text-primary mb-2 font-bold">2367</h1>
          <p class="font-medium text-carbon">Sent Voice</p>
        </div>
        <img alt="library" src="/SentVoice.png" />
      </div>
      <div class="update-card flex justify-between items-center gap-15">
        <div>
          <h1 class="text-primary mb-2 font-bold">2367</h1>
          <p class="font-medium text-carbon">Library</p>
        </div>
        <img alt="library" src="/library.png" />
      </div>
    </div>
    <div class="md:flex gap-6">
      <div class="md:w-[66%] w-full">
        <DashboardCard title="Messages">
          <div px-8>
            <div class="flex flex-col justify-between items-center gap-10">
              <img src="/pie-chart.png" alt="" class="h-90" />
            </div>
            <div
              class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 content-around gap-10 md:mb-0 mb-10"
            >
              <div class="mb-8 flex flex-col items-center md:items-start">
                <div class="flex items-center gap-2 mb-2">
                  <img src="/messages.png" alt="" class="h-8" />
                </div>
                <div class="flex items-center mb-2">
                  <h4 class="text-carbon mr-2">25</h4>
                  <span class="text-[20px] font-normal text-stone">(4.4%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <img src="/sms-bullet.png" alt="" />
                  <span class="text-silver">Sms</span>
                </div>
              </div>
              <div class="mb-8 flex flex-col items-center md:items-start">
                <div class="flex items-center gap-2 mb-2">
                  <img src="/SentEmails.png" alt="" class="h-8" />
                </div>
                <div class="flex items-center mb-2">
                  <h4 class="text-carbon mr-2">150</h4>
                  <span class="text-[20px] font-normal text-stone">(2.5%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <img src="/email-bullet.png" alt="" />
                  <span class="text-silver">Emails</span>
                </div>
              </div>
              <div class="mb-8 flex flex-col items-center md:items-start">
                <div class="flex items-center gap-2 mb-2">
                  <img src="/alerts.png" alt="" class="h-8" />
                </div>
                <div class="flex items-center mb-2">
                  <h4 class="text-carbon mr-2">230</h4>
                  <span class="text-[20px] font-normal text-stone">(4.7%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <img src="/alert-bullet.png" alt="" />
                  <span class="text-silver">Alerts</span>
                </div>
              </div>
              <div class="mb-8 flex flex-col items-center md:items-start">
                <div class="flex items-center gap-2 mb-2">
                  <img src="/SentVoice.png" alt="" class="h-8" />
                </div>
                <div class="flex items-center mb-2">
                  <h4 class="text-carbon mr-2">160</h4>
                  <span class="text-[20px] font-normal text-stone">(2.3%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <img src="/voice-bullet.png" alt="" />
                  <span class="text-silver">Voice</span>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
      <div class="bg-white small-shadow rounded-[4px] w-full">
        <div class="flex md:justify-end justify-start p-6">
          <div class="flex items-center lex-wrap">
            <div
              class="tab"
              :class="{ active: activeTab === 'alerts' }"
              @click="activeTab = 'alerts'"
            >
              Alerts
            </div>
            <div
              class="tab"
              :class="{ active: activeTab === 'email' }"
              @click="activeTab = 'email'"
            >
              Email
            </div>
            <div
              class="tab"
              :class="{ active: activeTab === 'sms' }"
              @click="activeTab = 'sms'"
            >
              Sms
            </div>
            <div
              class="tab"
              :class="{ active: activeTab === 'voice' }"
              @click="activeTab = 'voice'"
            >
              Voice
            </div>
          </div>
        </div>
        <div class="relative">
          <div v-show="activeTab === 'alerts'">
            <h5
              class="text-stone md:absolute md:-top-[63px] md:left-0 md:pl-6 md:ml-0 ml-7"
            >
              Recent Sent Alerts
            </h5>
            <DashboardTable
              :headers="RecentEmailHeaders"
              :rows="RecentEmailRows"
              class="w-full overflow-auto scroll relative"
            />
          </div>
          <div v-show="activeTab === 'email'">
            <h5
              class="text-stone md:absolute md:-top-[63px] md:left-[23px] md:ml-0 ml-7"
            >
              Recent Sent Emails
            </h5>
            <DashboardTable
              :headers="RecentEmailHeaders"
              :rows="RecentEmailRows"
              class="w-full overflow-auto scroll"
            />
          </div>
          <div v-show="activeTab === 'sms'">
            <h5
              class="text-stone md:absolute md:-top-[63px] md:left-[23px] md:ml-0 ml-7"
            >
              Recent Sent SMS
            </h5>
            <DashboardTable
              :headers="RecentEmailHeaders"
              :rows="RecentEmailRows"
              class="w-full overflow-auto scroll"
            />
          </div>
          <div v-show="activeTab === 'voice'">
            <h5
              class="text-stone md:absolute md:-top-[63px] md:left-[23px] md:ml-0 ml-7"
            >
              Recent Sent Voice
            </h5>
            <DashboardTable
              :headers="RecentEmailHeaders"
              :rows="RecentEmailRows"
              class="w-full overflow-auto scroll relative"
            />
          </div>
        </div>
      </div>
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
