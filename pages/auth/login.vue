<script lang="ts" setup>
const { setLoader } = useLoader();
definePageMeta({
  layout: 'auth',
});

const { query } = useRoute();
const { data, login, errorMessage } = useLogin();

onMounted(async () => {
  const { APP_URL, APP_AUTH_URL } = useRuntimeConfig().public;
  setLoader(true);
  if (query.token) {
    data.token = query.token as string;
    await login();
    setLoader(false);
  } else {
    await navigateTo(`${APP_AUTH_URL}?redirect_url=${APP_URL}/auth/login`, {
      external: true,
    });
  }
});
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-else></div>
  </div>
</template>
