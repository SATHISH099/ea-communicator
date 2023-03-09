<script lang="ts" setup>
import { useRoute } from 'vue-router';
const config = useRuntimeConfig();
const { id } = useRoute().params;

const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};
const { data } = await useFetch<any>(() => `emails/${id}`, {
  baseURL: config.public.API_BASE_URL,
});
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
                <p class="text-carbon">12</p>
              </div>
              <div class="mb-10 grid gap-y-2">
                <h5 class="text-stone">Groups</h5>
                <p class="text-carbon">03</p>
              </div>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Subject</h5>
              <p class="text-carbon">{{ data.body }}</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Alert Messages</h5>
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
            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Communication Channel</h5>
              <p class="text-carbon">SMS, Email, Voice</p>
            </div>
          </div>
        </div>
        <RecipientList />
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
