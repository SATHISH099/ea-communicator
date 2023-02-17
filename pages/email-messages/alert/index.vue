<script lang="ts" setup>
const MessageHeaders = [
  'Recipients',
  'Subject',
  'Alert Message',
  'Sent Date',
  '',
];
const MessageRows = [
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    AlertMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    AlertMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    AlertMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    AlertMessage:
      'It depends largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    AlertMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    AlertMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    AlertMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    AlertMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    AlertMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
];
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">Messages</h4>
        <p class="text-silver">
          Communicator / Email Messages /
          <span class="text-primary">Messages</span>
        </p>
      </div>
      <div>
        <NuxtLink to="./predefined-messages/add" class="btn btn-primary"
          >Add New Message</NuxtLink
        >
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="p-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <FormKit
              type="search"
              placeholder="Search Alert"
              input-class="form-control w-[555px]"
              value=""
            />
            <button class="btn btn-primary ml-4">Search</button>
          </div>
          <div class="flex items-center gap-3">
            <FormKit
              input-class="form-control"
              type="select"
              placeholder="Predefined type"
              name="predefined_messages"
              :options="['email', 'alert', 'sms', 'voice']"
            />
            <FormKit
              input-class="form-control"
              type="select"
              name="predefined_messages"
              :options="['Sort by']"
            />
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
