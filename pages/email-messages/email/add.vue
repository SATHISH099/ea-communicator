<script setup>
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

const MessageHeaders = ['Title', 'Message'];
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
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};
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
    </div>
    <div w-full>
      <div grid grid-cols-3 gap-5>
        <div bg-white small-shadow p-6 col-span-2>
          <div flex justify-between items-center>
            <h5 text-stone>Compose New Email</h5>
            <div flex items-center gap-5>
              <h6 text-stone>Importance Level</h6>
              <div flex items-center gap-3>
                <FormKit
                  v-model="value"
                  type="radio"
                  outer-class="radio-fieldset"
                  input-class="form-check-input"
                  :options="['Low', 'Medium', 'High']"
                />
              </div>
            </div>
          </div>
          <div grid grid-cols-2 gap-5 mt-8>
            <FormKit
              type="select"
              name="from"
              :options="['test1', 'test2']"
              placeholder="From"
              input-class="form-control"
            />
            <button
              class="border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[1rem] text-silver items-center p-[1rem]"
              @click="toggleModal"
            >
              <span>TO</span>
              <img src="/plus.png" alt="plus" />
            </button>
            <button
              class="border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[16px] text-silver items-center p-[1rem]"
              @click="toggleModal"
            >
              <span>CC</span>
              <img src="/plus.png" alt="plus" />
            </button>
            <button
              class="border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[16px] text-silver items-center p-[1rem]"
              @click="toggleModal"
            >
              <span>BCC</span>
              <img src="/plus.png" alt="plus" />
            </button>
            <input
              placeholder="Subject"
              type="text"
              class="form-control col-span-2 mb-5"
            />
          </div>
          <div class="flex justify-end items-center mt-5">
            <button class="btn btn-primary">Send Email</button>
          </div>
        </div>
        <div bg-white small-shadow>
          <div px-6 pt-6>
            <h5 text-stone mb-5>Predefined Templates</h5>
            <FormKit
              type="search"
              placeholder="Search"
              input-class="form-control"
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
      <TheModal
        title="Select Recipient and Groups"
        :show="showModal"
        @close="toggleModal"
      >
        <div class="mt-10">
          <Multiselect
            v-model="value"
            :options="['test1', 'test2']"
            searchable="true"
            mode="tags"
            :create-option="true"
            :close-on-select="false"
          />
          <div flex justify-end mt-5>
            <button class="btn btn-primary">Add</button>
          </div>
        </div>
      </TheModal>
    </div>
  </div>
</template>
