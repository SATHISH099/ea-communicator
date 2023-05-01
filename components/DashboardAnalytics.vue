<script lang="ts" setup>
const { $trpc } = useNuxtApp();

const groupService = useService('group');
const recipientService = useService('recipient');

if (process.client) {
  recipientService.setAuth();
  groupService.setAuth();
}

const data = await $trpc.dashboard.counts.query({
  countType: 'models',
});

const groupsCount = await groupService.count();
const recipientsCount = await recipientService.count();
</script>

<template>
  <div
    class="grid lg:grid-cols-2 xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-6 mb-8 dashboard-count"
  >
    <div
      class="update-card small-shadow bg-white rounded-[4px] md:p-[16px] p-[10px] flex justify-between items-center gap-15 md:gap-10"
    >
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ data.smsCount }}</h1>
        <p class="font-medium text-carbon">Sent SMS</p>
      </div>
      <img alt="messages" src="/messages.png" class="md:w-[40px] xl:w-[auto]" />
    </div>
    <div
      class="update-card small-shadow bg-white rounded-[4px] md:p-[16px] p-[10px] flex justify-between items-center gap-15 md:gap-10"
    >
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ data.emailCount }}</h1>
        <p class="font-medium text-carbon">Sent Emails</p>
      </div>
      <img
        alt="recipient and groups"
        src="/SentEmails.png"
        class="md:w-[40px] xl:w-[auto]"
      />
    </div>
    <div
      class="update-card small-shadow bg-white rounded-[4px] md:p-[16px] p-[10px] flex justify-between items-center gap-15 md:gap-10"
    >
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ data.messageCount }}</h1>
        <p class="font-medium text-carbon whitespace-nowrap">Sent Alerts</p>
      </div>
      <img alt="alerts" src="/alerts.png" class="md:w-[40px] xl:w-[auto]" />
    </div>
    <div
      class="update-card small-shadow bg-white rounded-[4px] md:p-[16px] p-[10px] flex justify-between items-center gap-15 md:gap-10"
    >
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ data.libraryCount }}</h1>
        <p class="font-medium text-carbon">Library</p>
      </div>
      <img alt="library" src="/library.png" class="md:w-[40px] xl:w-[auto]" />
    </div>
    <div
      class="update-card small-shadow bg-white rounded-[4px] md:p-[16px] p-[10px] flex justify-between items-center gap-15 md:gap-10"
    >
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ groupsCount }}</h1>
        <p class="font-medium text-carbon">Groups</p>
      </div>
      <svgsGroups />
    </div>
    <div
      class="update-card small-shadow bg-white rounded-[4px] md:p-[16px] p-[10px] flex justify-between items-center gap-15 md:gap-10"
    >
      <div>
        <h1 class="text-primary mb-2 font-bold">{{ recipientsCount }}</h1>
        <p class="font-medium text-carbon">Recipients</p>
      </div>
      <SvgsRecipients />
    </div>
  </div>
</template>
