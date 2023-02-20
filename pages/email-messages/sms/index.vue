<script lang="ts" setup>
const MessageHeaders = [
  'Recipients',
  'Message Title',
  'Sender',
  'Sms Message',
  'Sent Date',
];
const MessageRows = [
  {
    Recepients: 'Wade Warren',
    MessageTitle: 'Request For API endpoints',
    Sender: 'Adnan Izhar',
    SmsMessage:
      'It depeds largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recepients: 'Wade Warren',
    MessageTitle: 'Request For API endpoints',
    Sender: 'Adnan Izhar',
    SmsMessage:
      'It depeds largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recepients: 'Wade Warren',
    MessageTitle: 'Request For API endpoints',
    Sender: 'Adnan Izhar',
    SmsMessage:
      'It depeds largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recepients: 'Wade Warren',
    MessageTitle: 'Request For API endpoints',
    Sender: 'Adnan Izhar',
    SmsMessage:
      'It depeds largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recepients: 'Wade Warren',
    MessageTitle: 'Request For API endpoints',
    Sender: 'Adnan Izhar',
    SmsMessage:
      'It depeds largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recepients: 'Wade Warren',
    MessageTitle: 'Request For API endpoints',
    Sender: 'Adnan Izhar',
    SmsMessage:
      'It depeds largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recepients: 'Wade Warren',
    MessageTitle: 'Request For API endpoints',
    Sender: 'Adnan Izhar',
    SmsMessage:
      'It depeds largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recepients: 'Wade Warren',
    MessageTitle: 'Request For API endpoints',
    Sender: 'Adnan Izhar',
    SmsMessage:
      'It depeds largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recepients: 'Wade Warren',
    MessageTitle: 'Request For API endpoints',
    Sender: 'Adnan Izhar',
    SmsMessage:
      'It depeds largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
];
</script>

<template>
  <div>
    <div class="md:flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">Sms</h4>
        <p class="text-silver">
          Communicator / Email / Messages /
          <span class="text-primary">SMS</span>
        </p>
      </div>
      <div class="flex mt-10 md:mt-0">
        <NuxtLink
          to="./sms/add"
          class="btn btn-primary w-full flex justify-center"
          >Create New Sms</NuxtLink
        >
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="p-6">
        <div class="flex flex-wrap items-center gap-4">
          <FormKit
            prefix-icon="search"
            type="search"
            placeholder="Search"
            input-class="form-control pl-[3.5rem]"
            prefix-icon-class="search-icon"
            outer-class="md:w-[34rem] w-full"
          />
          <button class="btn btn-primary md:w-30 w-full">Search</button>
        </div>
      </div>
      <div class="pb-10 pt-5 overflow-auto scroll relative">
        <DashboardTable :headers="MessageHeaders" :rows="MessageRows" />
        <div class="ml-8">
          <PaginationTable></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
