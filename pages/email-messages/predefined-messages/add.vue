<script setup>
// import { QuillEditor } from '@vueup/vue-quill';
// import '@vueup/vue-quill/dist/vue-quill.snow.css';
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-carbon">Predefined Messages</h4>
        <p class="text-silver">
          Smart Suite / Communicator /
          <span class="text-primary">Predefined Messages</span>
        </p>
      </div>
      <div>
        <NuxtLink @click.prevent="$router.back()" class="btn btn-primary"
          >Back</NuxtLink
        >
      </div>
    </div>
    <DashboardCard title="Add New Predefined Messages">
      <div class="p-6">
        <div class="max-w-[50rem]">
          <FormKit
            type="text"
            placeholder="Title of the message"
            input-class="form-control"
            outer-class="mb-5"
          />
          <FormKit
            input-class="form-control"
            type="select"
            name="predefined_message"
            placeholder="Predefined message type"
            :options="['email', 'message', 'sms', 'voice']"
            outer-class="mb-5"
          />
          <div class="mb-5">
            <!-- <ClientOnly>
              <QuillEditor :content="content" />
            </ClientOnly> -->
          </div>
          <div class="flex justify-end">
            <button class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </DashboardCard>
  </div>
</template>
