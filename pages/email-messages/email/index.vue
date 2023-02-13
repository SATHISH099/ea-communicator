<script lang="ts" setup>
const MessageHeaders = ['Title', 'Message', 'Created Date'];
const MessageRows = [
  {
    title: 'Keyword',
    message: 'This is a test message ',
    date: 'Mon, 19 Sep 2022 09:01 PM',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
    date: 'Mon, 19 Sep 2022 09:01 PM',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
    date: 'Mon, 19 Sep 2022 09:01 PM',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
    date: 'Mon, 19 Sep 2022 09:01 PM',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
    date: 'Mon, 19 Sep 2022 09:01 PM',
  },
];
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-carbon">Email</h4>
        <p class="text-silver">
          Smart Suite / Communicator /
          <span class="text-primary">Email</span>
        </p>
      </div>
      <div>
        <NuxtLink to="./email/add" class="btn btn-primary"
          >Compose New Email</NuxtLink
        >
      </div>
    </div>
    <div class="bg-white small-shadow">
      <div class="p-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <FormKit
              type="search"
              placeholder="Search Email"
              input-class="form-control w-[555px]"
            />
            <button class="btn btn-primary ml-4">Search</button>
          </div>
          <div class="flex items-center gap-3">
            <FormKit
              input-class="form-control"
              type="select"
              placeholder="Sort by: Oldest to newest"
              name="predefined_messages"
              :options="['older']"
            />
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
