<script lang="ts" setup>
import { useToasterStore } from '~~/store/toaster';

const { setMessage } = useToasterStore();
interface initialStateData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  mobile?: string;
  designation?: string;
  notes?: string;
  profilePath?: string;
}

const initialState: initialStateData = {
  firstName: '',
  email: '',
  middleName: '',
  lastName: '',
};

const profileService = useService('profile');
const profileImage = ref<any>();
const submitting = ref(false);

const profile = ref<initialStateData>({ ...initialState });

onMounted(async () => {
  profileService.setAuth();
  const userProfile = await profileService.get();

  profile.value = userProfile;
});

const submitHandler = async () => {
  try {
    submitting.value = true;
    const formElement = document.getElementById(
      'updateProfile',
    ) as HTMLFormElement;

    const formData = new FormData(formElement);

    const response = await profileService.update(formData);
    if (response) {
      setMessage('Profile Updated successfully', 'success');
    } else {
      setMessage('Something went wrong.', 'error');
    }
  } catch (error) {
    console.error(new Error('Whoops, something went wrong.'));
  }
  submitting.value = false;
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
        <div class="lg:flex gap-5">
          <div class="md:w-[20%]">
            <div class="relative mb-10">
              <img
                :src="profile.profilePath || '/profile.png'"
                class="h-67 w-69"
              />
              <button
                type="button"
                class="bottom-0 absolute bg-[#D9D9D9] text-carbon h-10 w-69 text-center flex items-center justify-center hover:text-stone cursor-pointer border-none text-lg"
                onclick="this.nextElementSibling.click()"
              >
                Change Picture
              </button>
              <input
                @change="profileImage = ($event.target as any)?.files[0]"
                id="image"
                ref="file"
                type="file"
                accept="image/*"
                name="image"
                class="hidden"
              />
            </div>
          </div>
          <div class="md:w-[80%] md:mt-0 mt-4">
            <div class="md:flex gap-5">
              <FormKit
                v-model="profile.firstName"
                name="firstName"
                type="text"
                validation="required"
                placeholder="First Name"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
              <FormKit
                v-model="profile.middleName"
                name="middleName"
                type="text"
                placeholder="Middle Name"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
              <FormKit
                v-model="profile.lastName"
                name="lastName"
                type="text"
                validation="required"
                placeholder="Last Name"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
            </div>
            <div class="md:flex gap-5">
              <FormKit
                v-model="profile.phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Phone"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
              <FormKit
                v-model="profile.email"
                name="email"
                disabled="true"
                type="text"
                placeholder="Email"
                input-class="form-control"
                outer-class="w-full mb-5"
              />
            </div>
            <FormKit
              v-model="profile.address"
              name="address"
              type="text"
              placeholder="Address"
              input-class="form-control"
              outer-class="mb-5 md:col-span-2 col-span-1"
            />
            <div class="w-full gap-5">
              <FormKit
                v-model="profile.designation"
                type="text"
                name="designation"
                input-class="form-control mb-5"
                placeholder="Designation"
              />
            </div>
            <div class="w-full mb-5">
              <FormKit
                v-model="profile.notes"
                name="notes"
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
          <button :disabled="submitting" class="btn btn-primary">
            Edit Profile
          </button>
        </div>
      </FormKit>
    </div>
  </div>
</template>
