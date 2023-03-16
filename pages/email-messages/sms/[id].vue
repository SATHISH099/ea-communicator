<script lang="ts" setup>
import Multiselect from '@vueform/multiselect';

const { $trpc } = useNuxtApp();
const { id } = useRoute().params;

const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};

const data = await $trpc.sms.show.query(parseInt(id as string));
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
          <span class="sub-heading"> SMS</span>
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
                <h5 class="text-stone">Sent Date</h5>
                <p class="text-carbon">{{ data.createdAt }}</p>
              </div>
              <div class="mb-10 grid gap-y-2">
                <h5 class="text-stone">Priority</h5>
                <p class="text-carbon">{{ data.importanceLevel }}</p>
              </div>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Sender</h5>
              <p class="text-carbon">{{ data.sender }}</p>
            </div>
            <div class="grid grid-cols-3">
              <div class="mb-10 grid gap-y-2">
                <h5 class="text-stone">Recipients</h5>
                <p class="text-carbon">{{ data.recipients.length }}</p>
              </div>
              <div class="mb-10 grid gap-y-2">
                <h5 class="text-stone">Groups</h5>
                <p class="text-carbon">{{ data.groups.length }}</p>
              </div>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Subject</h5>
              <p class="text-carbon">Request For API endpoints</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">SMS Messages</h5>
              <p class="text-carbon">{{ data.message }}</p>
            </div>
          </div>
        </div>
        <RecipientList :recipients="data.recipients" :groups="data.groups" />
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
