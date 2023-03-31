<script setup lang="ts">
import '~~/services/recipient.service';
import { useToasterStore } from '~~/store/toaster';

const { setMessage } = useToasterStore();
const router = useRouter();

definePageMeta({
  middleware: 'permission',
});

interface GroupData {
  id: number;
  groupName: string;
  status: boolean;
}

const recipientService = useService('recipient');
if (process.client) {
  recipientService.setAuth();
}
const locations = await $fetch<{ data: any[]; total: number }>(`/locations`, {
  baseURL: useRuntimeConfig().public.API_SMARTSUITE_BASEURL,
});

const initialState = {
  name: '',
  cellVoice: '',
  cellText: '',
  homeNumber: '',
  workNumber: '',
  emailAddress: '',
  alternateEmail: '',
  location: 0,
  status: true,
};

const data = reactive({ ...initialState });
const groups = ref<GroupData[] | []>([]);

const submitCreate = async () => {
  try {
    const request: any = eliminateNullValues({
      ...data,
      groups: groups.value.map(({ id }) => ({
        id,
      })),
      location: {
        id: data.location,
      },
    });
    const response = await recipientService.create(request);
    if (response) {
      setMessage('Recipient created successfully', 'success');
      router.push('/recipients-and-groups/recipients');
    } else {
      router.push('/recipients-and-groups/recipients/add');
      setMessage('Something went wrong unable to create Recipient.', 'error');
    }
  } catch (error) {
    console.error(new Error('Whoops, something went wrong.'));
  }
};

const setGroups = (groupSelected: GroupData[]) => {
  groups.value = groupSelected;
};
</script>

<template>
  <div>
    <div class="mb-10">
      <div>
        <h4 class="mb-4 text-carbon">Recipients</h4>
        <p class="text-silver">
          <NuxtLink to="/" class="text-silver sub-heading"
            >Smart Suite</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink to="/" class="text-silver sub-heading">
            Communicator</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink
            to="/recipients-and-groups/recipients"
            class="text-silver sub-heading"
          >
            Recipients</NuxtLink
          >
          <span class="text-silver">/</span>
          <span class="text-primary"> Create New Recipient </span>
        </p>
      </div>
    </div>
    <div w-full>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 md:col-span-2 col-span-1>
          <h5 text-stone>Create New Recipient</h5>
          <FormKit type="form" :actions="false" @submit="submitCreate">
            <div grid lg:grid-cols-2 grid-cols-1 gap-5 my-8>
              <FormKit
                v-model="data.name"
                name="Name"
                type="text"
                placeholder="Full Name*"
                input-class="form-control"
                validation="required|length:3,25"
              />
              <FormKit
                v-model="data.cellVoice"
                name="Cell Voice"
                type="number"
                placeholder="Mobile phone for voice calls*"
                validation="required|length:7,10"
                input-class="form-control"
              />
              <FormKit
                v-model="data.cellText"
                name="Cell Text"
                type="number"
                placeholder="Mobile phone for SMS*"
                input-class="form-control"
                validation="required|length:7,10"
              />
              <FormKit
                v-model="data.homeNumber"
                name="Home Number"
                type="number"
                placeholder="Home phone number*"
                input-class="form-control"
                validation="required|length:7,10"
              />
              <FormKit
                v-model="data.workNumber"
                name="Work Number"
                type="number"
                placeholder="Work phone number*"
                input-class="form-control"
                validation="required|length:7,10"
              />
              <FormKit
                v-model="data.emailAddress"
                name="Primary Email"
                type="email"
                validation="required|email"
                placeholder="Primary Email*"
                input-class="form-control"
              />
              <FormKit
                v-model="data.alternateEmail"
                name="Alternate Email"
                type="email"
                validation="email"
                placeholder="Alternate Email"
                input-class="form-control"
              />

              <FormKit
                v-model="data.location"
                type="select"
                validation="required"
                name="city"
                input-class="form-control"
                placeholder="Select Location"
                :options="[
                  { value: '', label: 'Select Location' },
                  ...locations.data.map((location) => ({
                    value: location.id,
                    label: `${location.city}, ${location.country}`,
                  })),
                ]"
              />
            </div>
            <div v-if="groups.length > 0" mb-5>
              <h6 class="text-carbon mb-4">Groups Added</h6>
              <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                <span
                  v-for="group in groups"
                  :key="group.id"
                  class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                >
                  {{ group.groupName }}
                </span>
              </div>
            </div>
            <FormKit
              input-class="btn btn-primary"
              type="submit"
              label="Create Recipient"
              wrapper-class="flex justify-end"
            />
          </FormKit>
        </div>
        <div>
          <ViewGroupsList :groups="groups" @set-groups="setGroups" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
