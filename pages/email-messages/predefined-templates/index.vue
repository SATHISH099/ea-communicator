<script lang="ts" setup>
import Multiselect from '@vueform/multiselect/src/Multiselect';

const MessageHeaders = [
  { value: 'Title', image: '/arrow-and-direction.png' },
  'Message',
  { value: 'Created Date', image: '/arrow-and-direction.png' },
];
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
    <div class="flex flex-wrap justify-between items-center mb-10">
      <div class="md:mb-0 mb-10">
        <h4 class="mb-4 text-stone">Predefined Templates</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Email / Messages</span>
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Email</span>
        </p>
      </div>
      <div class="md:w-auto w-full">
        <NuxtLink
          :to="{ name: 'email-messages-predefined-templates-add' }"
          class="btn btn-primary btn-create block md:w-auto w-full text-center"
          >Create Message</NuxtLink
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
              outer-class="md:w-[34rem] w-full search-field"
            />
            <button class="btn btn-primary md:w-auto w-full">Search</button>
          </div>
          <div class="flex flex-wrap items-center gap-3 md:w-auto w-full">
            <Multiselect
              placeholder="Predefined Type"
              :options="['test1', 'test2']"
              class="md:w-[14rem] w-full"
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
