<script lang="ts" setup>
import { useRoute } from 'vue-router';
import type { Recipient } from '~~/services/recipient.service';
const config = useRuntimeConfig();
const { id } = useRoute().params;

const messageHeaders = ['Recipients', 'Email Address'];
const { data } = await useFetch<any>(() => `groups/${id}`, {
  baseURL: config.public.API_SMARTSUITE_BASEURL,
});

const recipients = data.value.recipients.map(
  ({ name, emailAddress }: Recipient) => ({
    name,
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
                <p class="text-carbon">{{ data.createdAt }}</p>
              </div>
              <div class="mb-10 grid gap-y-2">
                <h6 class="text-stone">Status</h6>
                <p class="text-carbon">
                  {{ data.status ? 'Active' : 'Inactive' }}
                </p>
              </div>
            </div>

            <div class="mb-10 grid gap-y-2">
              <h6 class="text-stone">Group Name</h6>
              <p class="text-carbon">{{ data.groupName }}</p>
            </div>

            <div class="mb-10 grid gap-y-2">
              <h5 class="text-stone">Location</h5>
              <p class="text-carbon">
                {{
                  `${data.location.address}, ${data.location.city}, ${data.location.state}, ${data.location.country}`
                }}
              </p>
            </div>
            <div class="mb-10 grid gap-y-2">
              <h6 class="text-stone">Note</h6>
              <p class="text-carbon">{{ data.notes }}</p>
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
