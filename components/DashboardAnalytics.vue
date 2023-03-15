<script lang="ts" setup>
const config = useRuntimeConfig();

const { data } = await useFetch<any>(() => `dashboard/counters`, {
  baseURL: config.public.API_BASEURL,
});
</script>

<template>
  <div class="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-6 mb-8">
    <div class="update-card flex justify-between items-center gap-15">
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ data.smsCount }}</h1>
        <p class="font-medium text-carbon">Sent SMS</p>
      </div>
      <img alt="messages" src="/messages.png" />
    </div>
    <div class="update-card flex justify-between items-center gap-15">
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ data.emailCount }}</h1>
        <p class="font-medium text-carbon">Sent Emails</p>
      </div>
      <img alt="recipient and groups" src="/SentEmails.png" />
    </div>
    <div class="update-card flex justify-between items-center gap-15">
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ data.messageCount }}</h1>
        <p class="font-medium text-carbon whitespace-nowrap">Sent Messages</p>
      </div>
      <img alt="alerts" src="/alerts.png" class="h-[60px]" />
    </div>
    <div class="update-card flex justify-between items-center gap-15">
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ data.voiceCount }}</h1>
        <p class="font-medium text-carbon">Sent Voice</p>
      </div>
      <img alt="library" src="/SentVoice.png" />
    </div>
    <div class="update-card flex justify-between items-center gap-15">
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ data.libraryCount }}</h1>
        <p class="font-medium text-carbon">Library</p>
      </div>
      <img alt="library" src="/library.png" />
    </div>
  </div>
</template>
