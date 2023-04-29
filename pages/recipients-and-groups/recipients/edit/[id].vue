<script setup lang="ts">
import '~~/services/recipient.service';
import { useToasterStore } from '~~/store/toaster';

const config = useRuntimeConfig();
const { setMessage } = useToasterStore();
const { id: recipientId } = useRoute().params;
const router = useRouter();

definePageMeta({
  middleware: 'permission',
});

interface GroupData {
  id: number;
  groupName: string;
  status: boolean;
}

interface initialStateData {
  name: string;
  cellVoice: string;
  cellText: string;
  homeNumber: string;
  workNumber: string;
  emailAddress: string;
  alternateEmail: string;
  status: boolean;
  location: 0;
  notes: string;
}

const { data: recipientDetail } = await useFetch<any>(
  () => `recipients/${recipientId}`,
  {
    baseURL: config.public.API_SMARTSUITE_BASEURL,
  },
);

if (process.client && !recipientDetail.value) {
  navigateTo('/recipients-and-groups/recipients');
}

const locations = await $fetch<{ data: any[]; total: number }>(`/locations`, {
  baseURL: useRuntimeConfig().public.API_SMARTSUITE_BASEURL,
});

const record = recipientDetail.value;
const recipientService = useService('recipient');
if (process.client) {
  recipientService.setAuth();
}

const initialState: initialStateData = {
  name: record?.name,
  cellVoice: record?.cellVoice,
  cellText: record?.cellText,
  homeNumber: record?.homeNumber,
  workNumber: record?.workNumber,
  emailAddress: record?.emailAddress,
  alternateEmail: record?.alternateEmail,
  location: record?.location?.id,
  status: true,
  notes: record?.notes,
};

const data = reactive({ ...initialState });
const groups = ref<GroupData[] | []>(
  record?.groups.map(({ id, groupName, status }: GroupData) => ({
    id,
    groupName,
    status,
  })),
);

const submitUpdate = async () => {
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
    const response = await recipientService.update(
      Number(recipientId),
      request,
    );
    if (response) {
      setMessage('Recipient updated successfully', 'success');
      router.push('/recipients-and-groups/recipients');
    } else {
      setMessage('Error updating recipient data.', 'error');
      router.push(`/recipients-and-groups/recipients/edit/${recipientId}`);
    }
  } catch (error) {
    setMessage('Error updating recipient data.', 'error');
  }
};

const setGroups = (groupSelected: GroupData[]) => {
  groups.value = groupSelected;
};

const removeFromGroup = (id: number) => {
  groups.value = groups.value.filter(function (group: any) {
    return group.id !== id;
  });
};
</script>

<template>
  <div>
    <div class="mb-10">
      <div>
        <h4 class="mb-4 text-stone">Recipients</h4>
        <p class="text-silver">
          <NuxtLink to="/" class="text-silver sub-heading"
            >Communicator</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink to="/recipients-and-groups" class="text-silver sub-heading">
            Recipients And Groups</NuxtLink
          >
          <span class="text-silver">/</span>
          <NuxtLink
            to="/recipients-and-groups/recipients"
            class="text-silver sub-heading"
          >
            Recipients</NuxtLink
          >
          <span class="text-silver">/</span>

          <span class="text-primary hover:no-underline ml-1"
            >Edit Recipient</span
          >
        </p>
      </div>
    </div>
    <div w-full>
      <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
        <div bg-white small-shadow p-6 md:col-span-2 col-span-1>
          <h5 text-stone>Edit Recipient</h5>
          <FormKit type="form" :actions="false" @submit="submitUpdate">
            <div grid lg:grid-cols-2 grid-cols-1 gap-5 my-8>
              <FormKit
                v-model="data.name"
                name="Full Name"
                type="text"
                placeholder="Full Name*"
                input-class="form-control"
                validation="required|length:3,50"
                @input="limitCharacter(data, data.name, 'name', 50)"
              />

              <UiFormkitTel
                :value="data.cellVoice"
                placeholder="Mobile phone for voice calls*"
                validation-label="Voice phone"
                @input="(val) => (data.cellVoice = val)"
              />
              <UiFormkitTel
                :value="data.cellText"
                placeholder="Mobile phone for SMS*"
                validation-label="SMS phone"
                @input="(val) => (data.cellText = val)"
              />
              <UiFormkitTel
                :value="data.homeNumber"
                placeholder="Home phone number*"
                validation-label="Home phone"
                @input="(val) => (data.homeNumber = val)"
              />
              <UiFormkitTel
                :value="data.workNumber"
                placeholder="Work phone number*"
                validation-label="Work phone"
                @input="(val) => (data.workNumber = val)"
              />

              <FormKit
                v-model="data.emailAddress"
                name="Primary Email"
                type="email"
                validation="required|email"
                placeholder="Primary Email"
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
                name="location"
                input-class="form-control"
                placeholder="Select Location"
                :options="[
                  { value: '', label: 'Select Location' },
                  ...locations.data.map((location) => ({
                    value: location.id,
                    label: `${location.city} ${location.country}`,
                  })),
                ]"
              />
            </div>
            <div mb-5>
              <h6 class="text-carbon mb-4">Groups Added</h6>
              <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                <span
                  v-for="group in groups"
                  :key="group.id"
                  class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] mr-3 text-primary flex"
                >
                  {{ group.groupName }}
                  <button
                    type="button"
                    class="border-none outline-none bg-transparent text-primary mr-2"
                    @click="removeFromGroup(group.id)"
                  >
                    <span
                      class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-white bg-primary rounded-full ml-3"
                      >x</span
                    >
                  </button>
                </span>
              </div>
            </div>
            <FormKit
              input-class="btn btn-primary"
              type="submit"
              label="Update"
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
