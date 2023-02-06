<script lang="ts" setup></script>

<template>
  <div class="w-full mt-10">
    <div class="mb-10">
      <h2 class="text-center mb-4">Forgot Password</h2>
      <p class="text-center">
        Please enter your email which is associate with your account
      </p>
    </div>
    <FormKit
      :submit-attrs="{ inputClass: 'btn btn-primary w-full mt-8' }"
      type="form"
      input-class="btn btn-primary"
    >
      <FormKit
        placeholder="Email"
        name="email"
        validation="required|email"
        input-class="form-control"
        outer-class="mb-3"
      />
      <a class="flex justify-end" href="" @click.prevent="$router.back()"
        >Back to Login</a
      >
    </FormKit>
  </div>
</template>
