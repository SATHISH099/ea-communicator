<script lang="ts" setup>
const recentEmailHeaders = ['ID', 'Sender', 'Email Subject', 'Email Messages'];
const activeTab = ref('messages');
const { $trpc } = useNuxtApp();

const { data } = await $trpc.message.findAll.useQuery(
  {
    pageSize: 6,
  },
  {
    transform: ({ total, data }) => ({
      total,
      data: data.map((message: any) => ({
        id: message.id,
        sender: message.sender,
        subject: message.subject || message.title,
        body: message.message || message.body,
      })),
    }),
  },
);
</script>

<template>
  <div class="bg-white small-shadow rounded-[4px] w-full">
    <div class="flex md:justify-end justify-start p-6">
      <div class="flex items-center lex-wrap">
        <div
          class="tab"
          :class="{ active: activeTab === 'messages' }"
          @click="activeTab = 'messages'"
        >
          Alerts
        </div>
        <div
          class="tab"
          :class="{ active: activeTab === 'emails' }"
          @click="activeTab = 'emails'"
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
      </div>
    </div>
    <div class="relative">
      <div>
        <h5
          class="text-stone md:absolute md:-top-[63px] md:left-0 md:pl-6 md:ml-0 ml-7"
        >
          Recent Sent {{ activeTab }}
        </h5>
        <DashboardTable
          :headers="recentEmailHeaders"
          :rows="data?.data || []"
          class="w-full overflow-auto scroll relative"
          :isDropdown="false"
        />
      </div>
    </div>
  </div>
</template>
