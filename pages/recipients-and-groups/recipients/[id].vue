<script lang="ts" setup>
import { useRoute } from 'vue-router';
const config = useRuntimeConfig();
const { id } = useRoute().params;

const { data } = await useFetch<any>(() => `recipients/${id}`, {
  baseURL: config.public.API_SMARTSUITE_BASE_URL,
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
                <h6 class="text-stone mb-2">First Name</h6>
                <p class="text-carbon">{{ data.data.firstName }}</p>
              </div>
              <div>
                <h6 class="text-stone mb-2">Middle Name</h6>
                <p class="text-carbon">{{ data.data.middleName }}</p>
              </div>
              <div>
                <h6 class="text-stone mb-2">last Name</h6>
                <p class="text-carbon">{{ data.data.lastName }}</p>
              </div>
              <div>
                <h6 class="text-stone mb-2">Nick Name</h6>
                <p class="text-carbon">{{ data.data.nickName }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Mobile phone for voice calls</h6>
                <p class="text-carbon">{{ data.data.cellVoice }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Mobile phone for SMS</h6>
                <p class="text-carbon">{{ data.data.cellText }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Home phone number</h6>
                <p class="text-carbon">{{ data.data.homeNumber }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Work phone number</h6>
                <p class="text-carbon">{{ data.data.workNumber }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Primary E-Mail</h6>
                <p class="text-carbon">{{ data.data.emailAddress }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Alternate Email</h6>
                <p class="text-carbon">{{ data.data.alternateEmail }}</p>
              </div>
              <div col-span-2>
                <h6 class="text-stone mb-2">Address</h6>
                <p class="text-carbon">{{ data.data.location }}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ViewRecipients />
        </div>
      </div>
    </div>
  </div>
</template>
