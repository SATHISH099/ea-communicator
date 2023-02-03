<script lang="ts" setup></script>

<template>
  <div class="w-full mt-10">
    <div class="mb-10">
      <h2 class="text-center mb-4">Reset Password</h2>
      <p class="text-center">Please enter new password</p>
    </div>
    <FormKit
      :submit-attrs="{ inputClass: 'btn btn-primary w-full mt-8' }"
      type="form"
      input-class="btn btn-primary"
    >
      <FormKit
        placeholder="Create a new password"
        type="password"
        name="password"
        validation="required"
        input-class="form-control"
        outer-class="mb-4"
      />
      <FormKit
        placeholder="Confirm new password"
        type="password"
        name="password"
        validation="required"
        input-class="form-control"
        outer-class="mb-2"
      />
    </FormKit>
  </div>
</template>
