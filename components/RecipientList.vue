<script lang="ts" setup>
const MessageHeaders = ['Recipients', 'Email Address'];
const MessageRows = [
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
];

const activeTab = ref('alerts');
</script>

<template>
  <div bg-white small-shadow>
    <div px-6 pt-6>
      <h5 text-stone mb-5>Recipient's list</h5>
      <div class="flex items-center lex-wrap">
        <div
          class="tab"
          :class="{ active: activeTab === 'alerts' }"
          @click="activeTab = 'alerts'"
        >
          Recepients
        </div>
        <div
          class="tab"
          :class="{ active: activeTab === 'email' }"
          @click="activeTab = 'email'"
        >
          Groups
        </div>
      </div>
    </div>
    <DashboardTable mt-3 mb-8 :headers="MessageHeaders" :rows="MessageRows" />
  </div>
</template>
