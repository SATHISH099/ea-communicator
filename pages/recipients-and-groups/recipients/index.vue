<script lang="ts" setup>
const MessageHeaders = ['Title', 'Message', 'Created Date'];
const MessageRows = [
  {
    title: 'Keyword',
    message: 'This is a test message ',
    date: 'Mon, 19 Sep 2022 09:01 PM',
  },
  {
    title: 'Keyword1',
    message: 'This is a test message ',
    date: 'Mon, 19 Sep 2022 09:01 PM',
  },
  {
    title: 'Keyword2',
    message: 'This is a test message ',
    date: 'Mon, 19 Sep 2022 09:01 PM',
  },
  {
    title: 'Keyword3',
    message: 'This is a test message ',
    date: 'Mon, 19 Sep 2022 09:01 PM',
  },
  {
    title: 'Keyword4',
    message: 'This is a test message ',
    date: 'Mon, 19 Sep 2022 09:01 PM',
  },
];
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-between items-center mb-10">
      <div md:mb-0 mb-10>
        <h4 class="mb-4 text-stone">Recipients</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Recipients and Groups</span>
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Recipients</span>
        </p>
      </div>
      <div md:w-auto w-full>
        <NuxtLink
          :to="{ name: 'recipients-and-groups-recipients-add' }"
          class="btn btn-primary block md:w-auto w-full text-center"
          >Add New Recipient</NuxtLink
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
              outer-class="search-field md:w-[34rem] w-full"
            />
            <button class="btn btn-primary md:w-auto w-full">Search</button>
          </div>
        </div>
      </div>
      <div class="pb-10 pt-5">
        <DashboardTable :headers="MessageHeaders" :rows="MessageRows" />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
