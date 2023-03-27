<script lang="ts" setup>
type MessageType = 'message' | 'email' | 'sms';
const recentEmailHeaders = ['ID', 'Sender', 'Email Subject', 'Email Messages'];
const activeTab = ref<MessageType>('message');
const { $trpc } = useNuxtApp();

const { data, refresh } = await useAsyncData(
  (): any =>
    $trpc[activeTab.value].list.query({
      pageSize: 6,
    }),
  {
    transform: ({ total, data }: any) => ({
      total,
      data: data.map((message: any) => ({
        id: message.id,
        sender: message.sender?.name,
        subject: message.subject || message.title,
        body: message.message || message.body,
      })),
    }),
  },
);

const TAB_MENU = {
  message: 'Messages',
  email: 'Emails',
  sms: 'SMS',
};
</script>

<template>
  <div class="bg-white small-shadow rounded-[4px] w-full">
    <div class="flex md:justify-end justify-start p-6">
      <div class="flex items-center lex-wrap">
        <div
          v-for="(value, key) in TAB_MENU"
          :key="key"
          class="tab"
          :class="{ active: activeTab === key }"
          @click="
            {
              activeTab = key as MessageType;
              refresh();
            }
          "
        >
          {{ value }}
        </div>
      </div>
    </div>
    <div class="relative">
      <div>
        <h5
          class="text-stone md:absolute md:-top-[63px] md:left-0 md:pl-6 md:ml-0 ml-7"
        >
          Recent Sent {{ TAB_MENU[activeTab] }}
        </h5>
        <DashboardTable
          :headers="recentEmailHeaders"
          :rows="data?.data || []"
          class="w-full overflow-auto scroll relative"
          :is-dropdown="false"
        />
      </div>
    </div>
  </div>
</template>
