<script lang="ts" setup></script>

<template>
  <div class="font-sans">
    <div class="flex">
      <DashboardSidebar />
      <div class="w-full">
        <DashboardHeader />
        <div
          class="h-[89vh] overflow-auto pt-[4rem] md:pl-[2rem] pl-[1rem] md:pr-[2rem] pr-[1rem] md:pb-[2rem] pb-[1rem]"
        >
          <ToastNotification />
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
