<script setup>
const props = defineProps({
  error: {
    type: Error,
    default: () => ({}),
  },
});

const entityType = ref('');

if (props.error.statusCode === 401) {
  navigateTo('/auth/login');
}

if (props.error.message.includes('Could not find any entity of type')) {
  entityType.value = props.error.message.substring(
    props.error.message.indexOf('of type') + 9,
    props.error.message.indexOf('" matching'),
  );
}
</script>

<template>
  <div>
    <div class="login-layout">
      <div class="form-container">
        <div class="flex justify-center">
          <img class="logo" alt="logo" src="/smartsuite-logo.png" />
        </div>
        <ToastNotification />
        <h3 text-center mt-5>Error</h3>
        <h1 text-center class="text-[10rem]">{{ error.statusCode }}</h1>
        <p v-if="error.statusCode === 500" text-center>
          <span v-if="entityType">
            Requested {{ entityType.toLowerCase() }} could not be found.
          </span>
          <span v-else> Something went wrong, please try later! </span>
        </p>
        <div mt-10 text-center>
          <NuxtLink to="/" class="btn btn-primary">
            Click here to return to home page
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
