<template>
  <div>
    <DashboardHeader />
    <DashboardSidebar />
    <div class="main-wrapper m-10 ml-90">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
