<script lang="ts" setup>
import Multiselect from '@vueform/multiselect/src/Multiselect';

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
        <h4 class="mb-4 text-carbon">Predefined Templates</h4>
        <p class="text-silver">
          Smart Suite / Communicator /
          <span class="text-primary">Predefined Templates</span>
        </p>
      </div>
      <div>
        <NuxtLink to="./predefined-templates/add" class="btn btn-primary"
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
              outer-class="md:w-[34rem] w-full"
            />
            <button class="btn btn-primary">Search</button>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <Multiselect
              placeholder="Predefined Type"
              :options="['test1', 'test2']"
              class="md:w-[14rem] w-full"
            />
            <Multiselect
              placeholder="Sort by"
              :options="['test1', 'test2']"
              class="md:w-[10rem] w-full"
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
