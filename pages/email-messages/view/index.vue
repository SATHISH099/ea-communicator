<script lang="ts" setup>
import Multiselect from '@vueform/multiselect';

const MessageHeaders = ['Recipients', 'Email Address'];
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
        <h4 class="mb-4 text-stone">View Details</h4>
        <p class="text-silver">
          <span class="sub-heading">Comunicator</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Email / Messages</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Email</span>
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Email</span>
        </p>
      </div>
    </div>
    <div w-full>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 col-span-2>
          <div class="max-w-3xl">
            <div class="grid grid-cols-3">
              <div class="mb-10 grid gap-y-2">
                <h5 class="text-stone">Sent Date</h5>
                <p class="text-carbon">Monday, 19 sep 2022</p>
              </div>
              <div class="mb-10 grid gap-y-2">
                <h5 class="text-stone">Priority</h5>
                <p class="text-carbon">High</p>
              </div>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Sender</h5>
              <p class="text-carbon">Adnan Izhar</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Recipients</h5>
              <p class="text-carbon">12</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Subject</h5>
              <p class="text-carbon">Request For API endpoints</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Email Messages</h5>
              <p class="text-carbon">
                The impact of visual design on a project's success is
                significant, and it depends largely on how much emphasis is
                placed on it. Visual design refers to the aesthetic aspect of a
                project, which includes the color palette, typography, layout,
                and imagery. It can influence how users perceive and interact
                with a product, website, or app. In some cases, visual design
                may be the primary factor that attracts or repels users.
                Therefore, it is important to consider the appropriate level of
                emphasis on visual design when creating a project, as it can
                make a significant difference in its success.
              </p>
            </div>
          </div>
        </div>
        <div bg-white small-shadow>
          <div px-6 pt-6>
            <h5 text-stone mb-5>Recipient's list</h5>
            <div class="flex items-center lex-wrap">
              <div
                class="tab"
                :class="{ active: activeTab === 'alerts' }"
                @click="activeTab = 'alerts'"
              >
                Recepients
              </div>
              <div
                class="tab"
                :class="{ active: activeTab === 'email' }"
                @click="activeTab = 'email'"
              >
                Groups
              </div>
            </div>
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
          <div flex items-center gap-3>
            <Multiselect
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
