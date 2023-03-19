<script lang="ts" setup>
import { useToasterStore } from '~~/store/toaster';

const { setMessage } = useToasterStore();
interface initialStateData {
  name: string;
  email: string;
  middle: string;
  last: string;
  address: string;
  phone: string;
  mobile: string;
  designation: string;
  notes: string;
}

const profileService = useService('profile');
const userProfile = await profileService.get();
const initialState: initialStateData = {
  name: userProfile.data.name || '',
  email: userProfile.data.email || '',
  middle: userProfile.data.middle || '',
  last: userProfile.data.last || '',
  address: userProfile.data.address || '',
  phone: userProfile.data.phone || '',
  mobile: userProfile.data.mobile || '',
  designation: userProfile.data.designation || '',
  notes: userProfile.data.notes || '',
};

const data = reactive({ ...initialState });

const submitHandler = async () => {
  try {
    const response = await profileService.update(data);
    if (response) {
      setMessage('Profile Updated successfully.', 'success');
    } else {
      setMessage('Something went wrong.', 'error');
    }
  } catch (error) {
    console.error(new Error('Whoops, something went wrong.'));
  }
};
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
      <FormKit
        id="updateProfile"
        v-slot="{ value }"
        type="form"
        :actions="false"
        @submit="submitHandler"
      >
        <div class="md:flex gap-5">
          <div class="md:w-[20%]">
            <div class="relative">
              <img src="/profile.png" class="h-67 w-69" />
              <button
                class="bottom-0 absolute bg-[#D9D9D9] text-carbon h-10 w-69 text-center flex items-center justify-center hover:text-stone cursor-pointer border-none text-lg"
              >
                Change profile
              </button>
            </div>
          </div>
          <div class="md:w-[80%] md:mt-0 mt-4">
            <div class="md:flex gap-5">
              <FormKit
                v-model="data.name"
                name="first_name"
                type="text"
                validation="required"
                placeholder="First Name"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
              <FormKit
                v-model="data.middle"
                name="middle_name"
                type="text"
                validation="required"
                placeholder="Middle Name"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
              <FormKit
                v-model="data.last"
                name="last_name"
                type="text"
                validation="required"
                placeholder="Last Name"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
            </div>
            <div class="md:flex gap-5">
              <FormKit
                v-model="data.phone"
                name="phone"
                type="text"
                validation="required"
                placeholder="Phone"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
              <FormKit
                v-model="data.mobile"
                name="mobile"
                type="text"
                validation="required"
                placeholder="Mobile"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
              <FormKit
                v-model="data.email"
                name="email"
                disabled="true"
                type="text"
                validation="required"
                placeholder="Email"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
            </div>
            <FormKit
              v-model="data.address"
              name="address"
              type="text"
              validation="required"
              placeholder="Address"
              input-class="form-control"
              outer-class="mb-5 md:col-span-2 col-span-1"
            />
            <div class="w-full gap-5">
              <FormKit
                v-model="data.designation"
                type="select"
                validation="required"
                name="designation"
                input-class="form-control"
                placeholder="Designation"
                :options="[
                  'Developer',
                  'Project Manager',
                  'Qualtity Assurance',
                ]"
              />
            </div>
            <div class="w-full mb-5">
              <FormKit
                v-model="data.notes"
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
      </FormKit>
    </div>
  </div>
</template>
