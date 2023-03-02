<script setup>
import Multiselect from '@vueform/multiselect';

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
const activeTab = ref('alerts');
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">Scheduled Messages</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator </span> /
          <span class="sub-heading">Email / Messages </span> /
          <span class="sub-heading">Scheduled Message</span> /
          <span class="text-primary">Create New Scheduled Message</span>
        </p>
      </div>
    </div>
    <div w-full>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 col-span-2>
          <div md:flex flex-wrap justify-between items-center>
            <h5 text-stone>Create New Scheduled Message</h5>
            <div flex flex-wrap items-center gap-5>
              <h6 text-stone>Priority</h6>
              <div flex flex-wrap items-center gap-3>
                <FormKit
                  v-model="value"
                  type="radio"
                  outer-class="radio-fieldset"
                  input-class="form-check-input"
                  :options="['High', 'Normal', 'Low']"
                />
              </div>
            </div>
          </div>
          <div grid md:grid-cols-2 grid-cols-1 gap-5 mt-8>
            <button
              class="col-span-2 border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[16px] text-silver items-center p-[1rem]"
              @click="toggleModal"
            >
              <span>Recepient</span>
              <img src="/plus.png" alt="plus" />
            </button>
            <Multiselect
              v-model="value"
              placeholder="Sender"
              class="col-span-2"
              :options="['test1', 'test2']"
            />
            <FormKit
              type="text"
              placeholder="Title of the Message"
              input-class="form-control"
              outer-class="mb-5 col-span-2"
            />
          </div>

          <div class="w-full mb-5">
            <FormKit
              type="textarea"
              rows="10"
              placeholder="Message"
              outer-class="w-full"
              input-class="form-control"
            />
          </div>
          <div flex flex-wrap items-center gap-5 mb-6>
            <h6 text-stone>Communication Channels</h6>
            <div flex items-center gap-3>
              <FormKit
                v-model="value"
                name="Comunication Channels"
                type="checkbox"
                :options="['SMS', 'Email', 'Voice', 'Push Notification']"
                validation="required|min:1"
                outer-class="radio-fieldset"
                input-class="form-check-input"
              />
            </div>
          </div>
          <div flex flex-wrap justify-between items-center>
            <FormKit
              type="file"
              accept=".pdf,.doc,.docx,.xml,.md,.csv"
              multiple="true"
              inner-class="file-uploader"
              prefix-icon="link"
              prefix-icon-class="mr-3"
              outer-class="md:min-w-[20em] min-w-full"
            />
            <div class="flex items-center mt-5 md:w-auto w-full">
              <button class="btn btn-primary md:w-auto w-full">
                Send Messages
              </button>
            </div>
          </div>
        </div>
        <div bg-white small-shadow>
          <div px-6 pt-6>
            <h5 text-stone>Predefined Templates</h5>
            <div class="flex justify-start py-6">
              <div class="flex items-center gap-1 md:gap-0 flex-wrap">
                <div
                  class="tab"
                  :class="{ active: activeTab === 'all' }"
                  @click="activeTab = 'all'"
                >
                  All
                </div>
                <div
                  class="tab"
                  :class="{ active: activeTab === 'alerts' }"
                  @click="activeTab = 'alerts'"
                >
                  Messages
                </div>
                <div
                  class="tab"
                  :class="{ active: activeTab === 'sms' }"
                  @click="activeTab = 'sms'"
                >
                  Sms
                </div>
                <div
                  class="tab"
                  :class="{ active: activeTab === 'voice' }"
                  @click="activeTab = 'voice'"
                >
                  Voice
                </div>
                <div
                  class="tab whitespace-nowrap"
                  :class="{ active: activeTab === 'notification' }"
                  @click="activeTab = 'notification'"
                >
                  Push Notification
                </div>
              </div>
            </div>
            <FormKit
              prefix-icon="search"
              type="search"
              placeholder="Search"
              input-class="form-control pl-[3.5rem]"
              prefix-icon-class="search-icon"
              outer-class="search-field"
            />
          </div>
          <DashboardTable
            mt-3
            mb-8
            :headers="MessageHeaders"
            :rows="MessageRows"
            :isDropdown="false"
            :isTemplateDefine="true"
          />
        </div>
      </div>
      <TheModal
        title="Select Recipient and Groups"
        :show="showModal"
        @close="toggleModal"
      >
        <div class="mt-10">
          <div flex items-center gap-3>
            <Multiselect
              v-model="value"
              :options="['test1', 'test2']"
              searchable="true"
              mode="tags"
              :create-option="true"
              :close-on-select="false"
              placeholder="Search"
            />
            <button class="form-control w-[3.5rem] cursor-pointer">
              <img src="/add-user.png" alt="" />
            </button>
          </div>
          <div flex justify-end mt-5>
            <button class="btn btn-primary">Add</button>
          </div>
        </div>
      </TheModal>
    </div>
  </div>
</template>

<style lang="scss"></style>
