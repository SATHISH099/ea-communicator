<script lang="ts" setup>
import { useLayoutStore } from '~~/store/layout';

definePageMeta({
  middleware: ['guest'],
});

const { $trpc } = useNuxtApp();
const { query } = useRoute();
const { APP_URL, APP_AUTH_URL } = useRuntimeConfig().public;

useLayoutStore().setLayout('auth', false);

if (query.token) {
  try {
    const { token } = await $trpc.auth.login.mutate(query.token as string);
    useLayoutStore().setLayout('default', true);
    localStorage.setItem('token', token);
    await navigateTo('/');
  } catch (error) {
    await navigateTo(`${APP_AUTH_URL}?redirect_url=${APP_URL}/auth/login`, {
      external: true,
    });
  }
} else {
  await navigateTo(`${APP_AUTH_URL}?redirect_url=${APP_URL}/auth/login`, {
    external: true,
  });
}
</script>

<template>
  <div></div>
</template>
