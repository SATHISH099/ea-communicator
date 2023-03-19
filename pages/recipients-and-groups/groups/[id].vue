<script lang="ts" setup>
import { useRoute } from 'vue-router';
import type { Recipient } from '~~/services/recipient.service';
const config = useRuntimeConfig();
const { id } = useRoute().params;

const messageHeaders = ['Recipients', 'Email Address'];
const { data } = await useFetch<any>(() => `groups/${id}`, {
  baseURL: config.public.API_SMARTSUITE_BASEURL,
});

const recipients = data.value.data.recipients.map(
  ({ firstName, lastName, emailAddress }: Recipient) => ({
    name: `${firstName} ${lastName}`,
    emailAddress,
  }),
);
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
                <h6 class="text-stone">Date</h6>
                <p class="text-carbon">{{ data.data.createdAt }}</p>
              </div>
              <div class="mb-10 grid gap-y-2">
                <h6 class="text-stone">Status</h6>
                <p class="text-carbon">
                  {{ data.data.status ? 'Active' : 'Inactive' }}
                </p>
              </div>
            </div>

            <div class="mb-10 grid gap-y-2">
              <h6 class="text-stone">Group Name</h6>
              <p class="text-carbon">{{ data.data.groupName }}</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h6 class="text-stone">Country</h6>
              <p class="text-carbon">{{ data.data.country }}</p>
            </div>

            <div class="mb-10 grid gap-y-2">
              <h6 class="text-stone">Selected State / Territory</h6>
              <p class="text-carbon">{{ data.data.state }}</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h6 class="text-stone">City</h6>
              <p class="text-carbon">{{ data.data.city }}</p>
            </div>

            <div class="mb-10 grid gap-y-2">
              <h6 class="text-stone">Zip Code</h6>
              <p class="text-carbon">{{ data.data.zipCode }}</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h6 class="text-stone">Location</h6>
              <p class="text-carbon">{{ data.data.location }}</p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h6 class="text-stone">Note</h6>
              <p class="text-carbon">{{ data.data.notes }}</p>
            </div>
          </div>
        </div>
        <div bg-white small-shadow>
          <div px-6 pt-6>
            <h6 text-stone mb-5>Recipient's list</h6>
          </div>
          <DashboardTable
            mt-3
            mb-8
            :headers="messageHeaders"
            :rows="recipients"
            :isDropdown="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
