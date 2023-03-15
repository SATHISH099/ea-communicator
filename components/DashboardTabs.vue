<script lang="ts" setup>
import type { Email } from '~~/services/email.service';
import type { Sms } from '~~/services/sms.service';
import type { Message } from '~~/services/message.service';

const recentEmailHeaders = ['ID', 'Sender', 'Email Subject', 'Email Messages'];
const activeTab = ref('messages');
const config = useRuntimeConfig();

const { data } = await useFetch<any>(
  () => `${activeTab.value}?pageSize=6&orderType=desc&orderBy=id`,
  {
    baseURL: config.public.API_BASEURL,
    transform: (data) => {
      return {
        total: data.total,
        data: data.data.map((message: Email & Sms & Message) => ({
          id: message.id,
          sender: message.sender,
          subject: message.subject || message.title,
          body: message.message || message.body,
        })),
      };
    },
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
          :rows="data.data"
          class="w-full overflow-auto scroll relative"
          :isDropdown="false"
        />
      </div>
    </div>
  </div>
</template>
