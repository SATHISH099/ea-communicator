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
        <h4 class="mb-4 text-carbon">Predefined Messages</h4>
        <p class="text-silver">
          Smart Suite / Communicator /
          <span class="text-primary">Predefined Messages</span>
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
              placeholder="Search predefined message"
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
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
