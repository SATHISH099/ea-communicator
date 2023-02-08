<script lang="ts" setup>
const RecentEmailHeaders = [
  'Recipients',
  'Message Title',
  'Sender',
  'Sms Message',
  'Sent Date',
];
const RecentEmailRows = [
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
    <div class="mb-4">
      <h2 class="mb-4">Sms</h2>
      <div class="flex justify-between">
        <p class="text-silver">
          Communicator / Email / Messages /
          <span class="text-primary">Alert</span>
        </p>
        <button class="btn btn-primary">Create New Sms</button>
      </div>
    </div>
    <div class="update-card">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <FormKit
            type="search"
            placeholder="Search alert"
            input-class="form-control w-[555px]"
            value=""
          />
          <button class="btn btn-primary ml-4">Search</button>
        </div>
        <div class="flex items-center gap-3">
          <FormKit
            input-class="form-control"
            type="select"
            name="predefined_messages"
            :options="['Sort by: older to Newest']"
          />
        </div>
      </div>
      <DashboardTable
        :headers="RecentEmailHeaders"
        :rows="RecentEmailRows"
        class="w-full"
      />
    </div>
  </div>
</template>

<style lang="scss"></style>
