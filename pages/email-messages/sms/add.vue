<script lang="ts" setup></script>

<template>
  <div>
    <div class="mb-4">
      <h2 class="mb-4">Sms</h2>
      <div class="flex justify-between">
        <p class="text-silver">
          Communicator / Email / Messages /
          <span class="text-primary">Alert</span>
        </p>
        <button class="btn btn-primary">Create New Sms</button>
      </div>
    </div>
    <div class="items-center grid grid-cols-3 gap-6 mb-8">
      <div
        class="update-card flex justify-between items-center gap-15 col-span-2"
      >
        abc
      </div>
      <DashboardCard title="Predefined Templates">
        <FormKit
          type="search"
          placeholder="Search alert"
          input-class="form-control w-[555px]"
          value=""
        />
      </DashboardCard>
    </div>
  </div>
</template>

<style lang="scss"></style>
