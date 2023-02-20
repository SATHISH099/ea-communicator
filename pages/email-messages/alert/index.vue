<script lang="ts" setup>
import Multiselect from '@vueform/multiselect/src/Multiselect';

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
    <div class="flex flex-wrap justify-between items-center mb-10">
      <div md:mb-0 mb-5>
        <h4 class="mb-4 text-stone">Messages</h4>
        <p class="text-silver">
          Communicator / Email Messages /
          <span class="text-primary">Messages</span>
        </p>
      </div>
      <div md:w-auto w-full>
        <NuxtLink
          to=""
          class="btn btn-primary block md:w-auto w-full text-center"
          >Create New Message</NuxtLink
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
            <button class="btn btn-primary md:w-auto w-full">Search</button>
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
