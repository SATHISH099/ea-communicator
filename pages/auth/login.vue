<script lang="ts" setup>
const { query } = useRoute();
const { APP_URL, APP_AUTH_URL } = useRuntimeConfig().public;

const { data, login, errorMessage } = useLogin();
if (query.token) {
  data.token = query.token as string;
  await delay(1000);
  login();
} else {
  await navigateTo(`${APP_AUTH_URL}?redirect_url=${APP_URL}/auth/login`, {
    external: true,
  });
}
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-else>Please wait...</div>
  </div>
</template>
