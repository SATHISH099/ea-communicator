<script lang="ts" setup>
const RecentEmailHeaders = [
  'Recipients',
  'Subject',
  'Alert Message',
  'Sent Date',
];
const RecentEmailRows = [
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
    <div class="mb-4">
      <h2 class="mb-4">Alert</h2>
      <div class="flex justify-between">
        <p class="text-silver">
          Communicator / Email / Messages /
          <span class="text-primary">Alert</span>
        </p>
        <button class="btn btn-primary">Create New Alert</button>
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
