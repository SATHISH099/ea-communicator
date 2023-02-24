<script lang="ts" setup>
const MessageHeaders = [
  { value: 'Recipients', image: '/arrow-and-direction.png' },
  'Subject',
  'Email Message',
  { value: 'Sent Date', image: '/arrow-and-direction.png' },
  '',
];
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
      'It depends largely on how much emphasis there is on visual design',
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
        <h4 class="mb-4 text-stone">Email</h4>
        <p class="text-silver">
          Communicator / Email / Messages /
          <span class="text-primary">Email</span>
        </p>
      </div>
      <div class="flex mt-10 md:mt-0">
        <NuxtLink
          to="./email/add"
          class="btn btn-primary btn-create w-full flex justify-center"
          >Compose New Email</NuxtLink
        >
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
              outer-class="md:w-[34rem] w-full"
            />
            <button class="btn btn-primary md:w-30 w-full">Search</button>
          </div>
        </div>
      </div>
      <div class="pb-10 pt-5 overflow-auto scroll">
        <DashboardTable :headers="MessageHeaders" :rows="MessageRows" />
        <div class="ml-8">
          <PaginationTable></PaginationTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
