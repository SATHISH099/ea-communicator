<script lang="ts" setup>
import { useRoute } from 'vue-router';
const config = useRuntimeConfig();
const { id } = useRoute().params;

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
const { data } = await useFetch<any>(() => `groups/${id}`, {
  baseURL: config.public.API_SMARTSUITE_BASE_URL,
});

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
          <span class="text-primary hover:no-underline ml-1">View Details</span>
        </p>
      </div>
    </div>
    <div w-full>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 col-span-2>
          <div class="max-w-3xl">
            <div class="grid grid-cols-3">
              <div class="mb-10 grid gap-y-2">
                <h5 class="text-stone">Group Name</h5>
                <p class="text-carbon">{{ data.data.createdAt }}</p>
              </div>
              <div class="mb-10 grid gap-y-2">
                <h5 class="text-stone">Status</h5>
                <p class="text-carbon">{{ data.data.status }}</p>
              </div>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Country</h5>
              <p class="text-carbon">{{ data.data.country }}</p>
            </div>

            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Selected State / Territory</h5>
              <p class="text-carbon">{{ data.data.state }}</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">City</h5>
              <p class="text-carbon">{{ data.data.city }}</p>
            </div>

            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Zip Code</h5>
              <p class="text-carbon">{{ data.data.zipCode }}</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Location</h5>
              <p class="text-carbon">{{ data.data.location }}</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Note</h5>
              <p class="text-carbon">{{ data.data.notes }}</p>
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
            :isDropdown="false"
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
