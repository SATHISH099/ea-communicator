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
    <div class="mb-10">
      <div>
        <h4 class="mb-4 text-carbon">Recipients</h4>
        <p class="text-silver">
          Smart Suite / Communicator / Recipients /
          <span class="text-primary"> Create New Recipient </span>
        </p>
      </div>
    </div>
    <div w-full>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 col-span-2>
          <h5 text-stone>Create New Recipient</h5>
          <div grid lg:grid-cols-2 grid-cols-1 gap-5 my-8>
            <FormKit
              type="text"
              placeholder="First Name"
              input-class="form-control"
            />
            <FormKit
              type="text"
              placeholder="Middle Name"
              input-class="form-control"
            />
            <FormKit
              type="text"
              placeholder="Last Name"
              input-class="form-control"
            />
            <FormKit
              type="text"
              placeholder="Nick Name"
              input-class="form-control"
            />
            <FormKit
              type="tel"
              placeholder="Mobile phone for voice calls"
              validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
              :validation-messages="{
                matches: 'Phone number must be in the format xxx-xxx-xxxx',
              }"
              validation-visibility="dirty"
              input-class="form-control"
            />
            <FormKit
              type="tel"
              placeholder="Mobile phone for SMS"
              validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
              :validation-messages="{
                matches: 'Phone number must be in the format xxx-xxx-xxxx',
              }"
              validation-visibility="dirty"
              input-class="form-control"
            />
            <FormKit
              type="tel"
              placeholder="Home phone number"
              validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
              :validation-messages="{
                matches: 'Phone number must be in the format xxx-xxx-xxxx',
              }"
              validation-visibility="dirty"
              input-class="form-control"
            />
            <FormKit
              type="tel"
              placeholder="Work phone number"
              validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
              :validation-messages="{
                matches: 'Phone number must be in the format xxx-xxx-xxxx',
              }"
              validation-visibility="dirty"
              input-class="form-control"
            />
            <FormKit
              name="Primary Email"
              type="email"
              validation="required|email|ends_with:.com"
              placeholder="Primary Email"
              input-class="form-control"
            />
            <FormKit
              name="Alternate Email"
              type="email"
              validation="email|ends_with:.com"
              placeholder="Alternate Email"
              input-class="form-control"
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
              name="Zip Code"
              placeholder="Zip Code"
              input-class="form-control"
            />
            <FormKit
              type="text"
              placeholder="Location"
              input-class="form-control"
              outer-class="col-span-2"
            />
          </div>
          <div class="flex justify-end items-center mt-5">
            <button class="btn btn-primary">Create Recipient</button>
          </div>
        </div>
        <div bg-white small-shadow>
          <div px-6 pt-6>
            <h5 text-stone mb-5>Group's list</h5>
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
