<script lang="ts" setup>
import { useLayoutStore } from '~~/store/layout';

const store = useLayoutStore();
const layout = store.layout;
</script>

<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
