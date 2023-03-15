<script lang="ts" setup>
import { useLayoutStore } from '~~/store/layout';
definePageMeta({
  middleware: ['guest'],
});

const { $trpc } = useNuxtApp();
const { query } = useRoute();

try {
  const { token } = await $trpc.auth.login.mutate(query.token as string);
  localStorage.setItem('token', token);
} catch (error) {}

const { set } = useLayoutStore();
set('auth');
</script>

<template>
  <div></div>
</template>
