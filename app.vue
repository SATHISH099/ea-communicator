<script lang="ts" setup>
import { useLayoutStore } from '~~/store/layout';

const { $trpc } = useNuxtApp();
const store = useLayoutStore();

const isAuthenticated = ref(false);

onMounted(async () => {
  isAuthenticated.value = await $trpc.profile.check.query();
  store.setLayout('auth', isAuthenticated.value);
});
</script>

<template>
  <div>
    <title>Communicator</title>
    <NuxtLayout :name="store.layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
