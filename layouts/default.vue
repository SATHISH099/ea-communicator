<script lang="ts" setup></script>

<template>
  <div class="font-sans">
    <div class="flex">
      <DashboardSidebar />
      <div class="w-full">
        <DashboardHeader />
        <div
          class="h-[89vh] overflow-auto pt-[3rem] pl-[3rem] pr-[2rem] pb-[2rem]"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
