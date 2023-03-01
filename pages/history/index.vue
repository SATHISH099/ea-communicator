<script lang="ts" setup>
const MessageHeaders = ['Recipients', 'Subject', 'Email Message', 'Sent Date'];
const MessageRows = [
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    EmailMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    EmailMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    EmailMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    EmailMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    EmailMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    EmailMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    EmailMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    EmailMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
  {
    Recipients: { value: 'johndoe@example.com', image: '/Ellipse.png' },
    Subject: 'Request For API endpoints',
    EmailMessage:
      'It depefs largely on how much emphasis there is on visual design',
    SentDate: 'Mon 19-sep-2022',
  },
];
</script>

<template>
  <div>
    <div class="md:flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">History</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span>/</span>

          <span class="text-primary ml-1">History </span>
        </p>
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="p-6">
        <div class="flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-wrap items-center gap-4">
            <FormKit
              prefix-icon="search"
              type="search"
              placeholder="Search"
              input-class="form-control pl-[3.5rem]"
              prefix-icon-class="search-icon"
              outer-class="md:w-[34rem] w-full search-field"
            />
            <button class="btn btn-primary md:w-30 w-full">Search</button>
          </div>
          <div class="flex items-center gap-3">
            <FormKit
              input-class="form-control"
              type="select"
              name="predefined_messages"
              :options="['Filter by: Date']"
            />
            <FormKit
              input-class="form-control"
              type="select"
              name="predefined_messages"
              :options="['Category: Email']"
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
