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
    <div class="flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-carbon">SMS</h4>
        <p class="text-silver">
          Communicator / Email / Messages /
          <span class="text-primary">SMS</span>
        </p>
      </div>
      <div>
        <NuxtLink to="" class="btn btn-primary">Add New Message</NuxtLink>
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="p-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <FormKit
              type="search"
              placeholder="Search"
              input-class="form-control w-[555px]"
              value=""
            />
            <button class="btn btn-primary ml-4">Search</button>
          </div>
        </div>
      </div>
      <div class="pb-10 pt-5">
        <DashboardTable :headers="MessageHeaders" :rows="MessageRows" />
        <div class="ml-8">
          <PaginationTable></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
