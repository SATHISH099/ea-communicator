<script lang="scss" setup></script>

<template>
  <div>
    <div class="mb-10">
      <h4 class="mb-4 text-stone">Email / Messages</h4>
      <p class="text-silver hover:text-primary">
        <span class="hover:underline mr-1 transition duration-700">
          Communicator</span
        >
        <span class="text-silver">/</span>
        <span class="text-primary hover:no-underline"> Email / Messages</span>
      </p>
    </div>
    <div
      class="bg-white small-shadow min-h-[48rem] flex justify-center items-center p-10"
    >
      <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <NuxtLink to="/email-messages/predefined-templates">
          <div class="w-[284px] h-[176px] rounded-[4px] small-shadow p-[25px]">
            <div class="flex flex-col justify-between items-center">
              <img src="/predefined-template.png" alt="messages" />
              <p class="text-[20px] text-carbon font-medium mt-6">
                Predefined Templates
              </p>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/email-messages/alert">
          <div class="w-[284px] h-[176px] rounded-[4px] small-shadow p-[25px]">
            <div class="flex flex-col justify-between items-center">
              <img src="/alerts.png" alt="messages" />
              <p class="text-[20px] text-carbon font-medium mt-6">Alerts</p>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/email-messages/email">
          <div class="w-[284px] h-[176px] rounded-[4px] small-shadow p-[25px]">
            <div class="flex flex-col justify-between items-center">
              <img src="/emails.png" alt="messages" />
              <p class="text-[20px] text-carbon font-medium mt-6">Emails</p>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/email-messages/sms">
          <div class="w-[284px] h-[176px] rounded-[4px] small-shadow p-[25px]">
            <div class="flex flex-col justify-between items-center">
              <img src="/messages.png" alt="messages" />
              <p class="text-[20px] text-carbon font-medium mt-6">SMS</p>
            </div>
          </div>
        </NuxtLink>
        <div class="w-[284px] h-[176px] rounded-[4px] small-shadow p-[25px]">
          <div class="flex flex-col justify-between items-center">
            <img src="/voice.png" alt="messages" />
            <p class="text-[20px] text-carbon font-medium mt-6">Voice</p>
          </div>
        </div>
        <div class="w-[284px] h-[176px] rounded-[4px] small-shadow p-[25px]">
          <div class="flex flex-col justify-between items-center">
            <img src="/library.png" alt="messages" />
            <p class="text-[20px] text-carbon font-medium mt-6">Library</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
