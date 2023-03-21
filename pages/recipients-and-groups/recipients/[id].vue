<script lang="ts" setup>
import { useRoute } from 'vue-router';
import type { Group } from '~~/services/group.service';
const config = useRuntimeConfig();
const { id } = useRoute().params;

const { data } = await useFetch<any>(() => `recipients/${id}`, {
  baseURL: config.public.API_SMARTSUITE_BASEURL,
});
const messageHeaders = ['Group Name', 'Status'];
const groups = data.value.groups.map(({ groupName, status }: Group) => ({
  groupName,
  status: status ? 'Active' : 'In-Active',
}));
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">View Details</h4>
        <p class="text-silver">
          <span class="sub-heading">Comunicator</span>
          <span class="text-silver">/</span>
          <span class="sub-heading"> Recipient and Groups</span>
          <span class="text-silver"> / </span>
          <span class="sub-heading">Recipients</span>
          <span class="text-silver">/ </span>
          <span class="text-primary hover:no-underline ml-1">View Details</span>
        </p>
      </div>
    </div>
    <div w-full>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 col-span-2>
          <div class="max-w-xl">
            <div class="grid grid-cols-2 gap-13">
              <div>
                <h6 class="text-stone mb-2">Name</h6>
                <p class="text-carbon">{{ data.name }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Mobile phone for voice calls</h6>
                <p class="text-carbon">{{ data.cellVoice }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Mobile phone for SMS</h6>
                <p class="text-carbon">{{ data.cellText }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Home phone number</h6>
                <p class="text-carbon">{{ data.homeNumber }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Work phone number</h6>
                <p class="text-carbon">{{ data.workNumber }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Primary E-Mail</h6>
                <p class="text-carbon">{{ data.emailAddress }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Alternate Email</h6>
                <p class="text-carbon">{{ data.alternateEmail }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Address</h6>
                <p class="text-carbon">
                  {{
                    `${data.location.address ? data.location.address : ''} ${
                      data.location.city
                    }, ${data.location.state}, ${data.location.country}`
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div bg-white small-shadow>
          <div px-6 pt-6>
            <h5 text-stone mb-5>Group's list</h5>
          </div>
          <DashboardTable
            mt-3
            mb-8
            :headers="messageHeaders"
            :rows="groups"
            :is-dropdown="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>
