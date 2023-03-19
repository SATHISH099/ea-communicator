<script lang="ts" setup>
import { useLayoutStore } from '~~/store/layout';

const isLoading = ref(useLayoutStore().loading);
</script>

<template>
  <div v-if="!isLoading">
    <div class="login-layout">
      <div class="form-container">
        <div class="flex justify-center">
          <img class="logo" alt="logo" src="/smartsuite-logo.png" />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
