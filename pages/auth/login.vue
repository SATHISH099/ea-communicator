<script lang="ts" setup>
import { useLayoutStore } from '~~/store/layout';

definePageMeta({
  middleware: ['guest'],
});

const { $trpc } = useNuxtApp();
const { query } = useRoute();
const { APP_URL, APP_AUTH_URL } = useRuntimeConfig().public;

if (query.token) {
  try {
    const { token } = await $trpc.auth.login.mutate(query.token as string);
    localStorage.setItem('token', token);
    useLayoutStore().setLayout('default', true);
    await navigateTo('/');
  } catch (error) {}
} else {
  useLayoutStore().setLayout('default', false);
  await navigateTo(`${APP_AUTH_URL}?redirect_url=${APP_URL}/auth/login`, {
    external: true,
  });
}
</script>

<template>
  <div></div>
</template>
