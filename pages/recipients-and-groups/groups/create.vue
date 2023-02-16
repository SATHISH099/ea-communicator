<script setup>
import Select from '@vueform/multiselect';

const MessageHeaders = ['Recipient', 'Nickname'];
const MessageRows = [
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
];
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-carbon">Groups</h4>
        <p class="text-silver">
          Smart Suite / Communicator / Groups /
          <span class="text-primary">Create New Group</span>
        </p>
      </div>
      <div>
        <button class="btn btn-primary flex items-center gap-3">
          <img src="/csv.png" alt="csv" />Upload CSV
        </button>
      </div>
    </div>
    <div w-full>
      <div grid grid-cols-3 gap-5>
        <div bg-white small-shadow p-6 col-span-2>
          <h5 text-stone>Create New Group</h5>
          <div grid grid-cols-2 gap-5 my-8>
            <FormKit
              type="text"
              placeholder="Group Name"
              input-class="form-control"
            />
            <Select
              v-model="value"
              placeholder="Status"
              :options="['Completed', 'None', 'Uncompleted']"
            />
            <Select
              v-model="value"
              placeholder="Select Country"
              :options="['Completed', 'None', 'Uncompleted']"
            />
            <Select
              v-model="value"
              placeholder="Select State / Territory"
              :options="['Completed', 'None', 'Uncompleted']"
            />
            <Select
              v-model="value"
              placeholder="Select City"
              :options="['Completed', 'None', 'Uncompleted']"
            />
            <FormKit
              type="number"
              placeholder="Zip Code"
              input-class="form-control"
            />
            <FormKit
              type="text"
              placeholder="Location"
              outer-class="col-span-2"
              input-class="form-control"
            />
            <FormKit
              type="textarea"
              rows="10"
              placeholder="Note"
              input-class="form-control"
              outer-class="col-span-2"
            />
          </div>
          <div>
            <h6 class="text-carbon">Recipient Added</h6>
          </div>
          <div class="flex justify-end items-center mt-5">
            <button class="btn btn-primary">Create Group</button>
          </div>
        </div>
        <div bg-white small-shadow>
          <div px-6 pt-6>
            <h5 text-stone mb-5>Recipient's list</h5>
            <FormKit
              prefix-icon="search"
              type="search"
              placeholder="Search"
              input-class="form-control pl-[3.5rem]"
              prefix-icon-class="search-icon"
            />
          </div>
          <DashboardTable
            mt-3
            mb-8
            :headers="MessageHeaders"
            :rows="MessageRows"
          />
        </div>
      </div>
    </div>
  </div>
</template>
