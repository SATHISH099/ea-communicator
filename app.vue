<script lang="ts" setup>
import { useLayoutStore } from '~~/store/layout';

const { $trpc } = useNuxtApp();
const store = useLayoutStore();

const layout = store.layout;
const isAuthenticated = await $trpc.profile.check.query();
store.setLayout('auth', isAuthenticated);
</script>

<template>
  <div>
    <title>Communicator</title>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
