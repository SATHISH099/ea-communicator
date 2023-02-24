<script setup>
import Multiselect from '@vueform/multiselect/src/Multiselect';
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-between items-center mb-10">
      <div class="md:mb-0 mb-10">
        <h4 class="mb-4 text-stone">Predefined Templates</h4>
        <p class="text-silver">
          Communicator / Email/Messages / Predefined Templates /
          <span class="text-primary"> Add New Predefined Template</span>
        </p>
      </div>
    </div>
    <DashboardCard title="Add New Predefined Template">
      <div class="p-6">
        <div flex flex-wrap items-center gap-5 mb-6>
          <h6 text-stone>Communication Channels</h6>
          <div flex items-center gap-3>
            <FormKit
              v-model="value"
              name="Comunication Channels"
              type="checkbox"
              :options="['SMS', 'Email', 'Voice']"
              validation="required|min:1"
              outer-class="radio-fieldset"
              input-class="form-check-input"
            />
          </div>
        </div>
        <div class="max-w-[50rem]">
          <FormKit
            type="text"
            placeholder="Title of the message"
            input-class="form-control"
            outer-class="mb-5"
          />
          <Multiselect
            v-model="value"
            placeholder="Predefined message type"
            :options="['email', 'message', 'sms', 'voice']"
            class="mb-5"
          />
          <div mb-5>
            <ClientOnly>
              <RichTextEditor />
            </ClientOnly>
          </div>
          <div class="flex justify-end">
            <button class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </DashboardCard>
  </div>
</template>
