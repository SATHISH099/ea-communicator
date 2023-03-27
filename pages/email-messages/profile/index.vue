<script lang="ts" setup>
import Multiselect from '@vueform/multiselect';
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-10">
      <div>
        <h4 class="mb-4 text-stone">Profile</h4>
        <p class="text-silver">
          <span class="sub-heading"> Communicator</span>
          <span class="text-silver">/</span>
          <span class="text-primary hover:no-underline ml-1">Profile</span>
        </p>
      </div>
    </div>
    <div class="small-shadow p-8">
      <div class="lg:flex gap-5">
        <div class="md:w-[20%]">
          <div class="relative">
            <img src="/profile.png" class="h-67 w-69" />
            <button
              class="bottom-0 absolute bg-[#D9D9D9] text-carbon h-10 w-69 text-center flex items-center justify-center hover:text-stone cursor-pointer border-none text-lg"
            >
              Change Picture
            </button>
          </div>
        </div>
        <div class="md:w-[80%] md:mt-0 mt-4">
          <div class="md:flex gap-5">
            <FormKit
              name="subject"
              type="text"
              validation="required"
              placeholder="First Name"
              input-class="form-control"
              outer-class="w-full mb-5"
            />
            <FormKit
              name="subject"
              type="text"
              validation="required"
              placeholder="Middle Name"
              input-class="form-control"
              outer-class="w-full mb-5"
            />
            <FormKit
              name="subject"
              type="text"
              validation="required"
              placeholder="Last Name"
              input-class="form-control"
              outer-class="w-full mb-5"
            />
          </div>
          <div class="md:flex gap-5">
            <FormKit
              name="subject"
              type="text"
              validation="required"
              placeholder="Subject"
              input-class="form-control"
              outer-class="w-full mb-5"
            />
            <FormKit
              name="subject"
              type="text"
              validation="required"
              placeholder="Subject"
              input-class="form-control"
              outer-class="w-full mb-5"
            />
            <FormKit
              name="subject"
              type="text"
              validation="required"
              placeholder="Email"
              input-class="form-control"
              outer-class="w-full mb-5"
            />
          </div>
          <FormKit
            name="subject"
            type="text"
            validation="required"
            placeholder="Address"
            input-class="form-control"
            outer-class="mb-5 md:col-span-2 col-span-1"
          />
          <div class="md:flex gap-5 ChangeProfile">
            <Multiselect
              placeholder="Technology"
              class="w-full mb-5"
              :options="['test1', 'test2']"
            />
            <Multiselect
              placeholder="Wolves"
              class="w-full mb-5"
              :options="['test1', 'test2']"
            />
            <Multiselect
              placeholder="Role"
              class="w-full mb-5"
              :options="['test1', 'test2']"
            />
          </div>
          <div class="w-full mb-5">
            <FormKit
              type="textarea"
              rows="10"
              placeholder="Notes"
              outer-class="w-full"
              input-class="form-control"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  </div>
</template>
