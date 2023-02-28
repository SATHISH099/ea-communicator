<script lang="scss" setup></script>

<template>
  <div>
    <div class="mb-10">
      <h4 class="mb-4 text-stone">Recipients and Groups</h4>
      <p class="text-silver">
        <span
          class="hover:text-primary hover:underline mr-1 transition duration-700"
        >
          Communicator</span
        >
        <span class="text-silver">/</span>
        <span class="text-primary ml-1">Recipients and Groups</span>
      </p>
    </div>
    <div
      class="bg-white small-shadow min-h-[41rem] flex justify-center items-center"
    >
      <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
        <NuxtLink to="/recipients-and-groups/groups">
          <div class="w-[284px] h-[176px] rounded-[4px] small-shadow p-[25px]">
            <div class="flex flex-col justify-between items-center">
              <img src="/groups.png" alt="messages" />
              <p class="text-[20px] text-carbon font-medium mt-6">Groups</p>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/recipients-and-groups/recipients">
          <div class="w-[284px] h-[176px] rounded-[4px] small-shadow p-[25px]">
            <div class="flex flex-col justify-between items-center">
              <img src="/recipients.png" alt="messages" />
              <p class="text-[20px] text-carbon font-medium mt-6">Recipients</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
